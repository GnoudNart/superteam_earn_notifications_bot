require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
import { webhookHandler } from '../src/bot';
import { bot, MyContext } from '../src/bot';
import { getUserIdsFromDatabase, checkDatabaseConnection, prisma, getFilteredSessionsMap } from '../src/database';

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Parse JSON bodies for Telegram webhook
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Server test thành công! Chào mừng bạn đến với API.');
});

app.post('/webhook', webhookHandler);

app.get('/test', (req, res) => {
  console.log('Received POST request with body:', req.body);
  if (Object.keys(req.body).length === 0) {
    return res.status(200).json({
      success: true,
      message: 'POST request thành công! Không có dữ liệu JSON nào được gửi.'
    });
  }
  res.status(200).json({
    success: true,
    message: 'POST request thành công và dữ liệu JSON đã được nhận!',
    receivedData: req.body
  });
});

app.get('/manual-send-notifications', async (req, res) => {
  try {
    console.log('Manual cron job for sending notifications triggered!');
    const userIds = await getUserIdsFromDatabase();
    if (userIds.length === 0) {
      console.log('No users to send notifications to.');
      return res.status(200).send('No users found to send notifications to.');
    }
    for (const userId of userIds) {
      try {
        await bot.api.sendMessage(userId, 'Đây là thông báo định kỳ của bạn từ bot (manual test)!');
        console.log(`Notification sent to user: ${userId}`);
      } catch (error) {
        console.error(`Failed to send message to user ${userId}:`, error);
      }
    }
    console.log('Manual cron job for sending notifications finished.');
    res.status(200).send('Notifications sent successfully (manual test)!');
  } catch (error) {
    console.error('Error in manual cron job:', error);
    res.status(500).send('Error sending notifications (manual test).');
  }
});

// Thêm API endpoint để test kết nối database
app.get('/check-db-connection', async (req, res) => {
  const isConnected = await checkDatabaseConnection();
  if (isConnected) {
    res.status(200).json({ status: 'success', message: 'Successfully connected to the database!' });
  } else {
    res.status(500).json({ status: 'error', message: 'Failed to connect to the database. Check logs for details.' });
  }
});

// Quan trọng: Disconnect Prisma Client khi ứng dụng đóng
// Trên Vercel, các hàm serverless có vòng đời ngắn, nhưng nếu bạn có logic clean-up
// khi ứng dụng "tắt", bạn có thể gọi $disconnect.
// Tuy nhiên, đối với hàm serverless, Prisma sẽ quản lý kết nối tự động.
// Một cách phổ biến là hook vào signal process.exit nếu chạy on-premise
// process.on('beforeExit', async () => {
//   await prisma.$disconnect();
// });

app.get('/crud_fake_user_for_test', (req, res) => {
  // implement ui for crud user
  res.sendFile(path.join(__dirname, '..', 'components', 'crud_fake_user_for_test.htm'));
});

function bigIntToString(obj) {
    // If the object itself is a BigInt, convert it directly
    if (typeof obj === 'bigint') {
        return obj.toString();
    }
    // If it's not an object or is null, return as is
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // If it's an array, map over its elements
    if (Array.isArray(obj)) {
        return obj.map(bigIntToString);
    }

    // If it's a plain object, iterate over its properties
    const newObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = bigIntToString(obj[key]);
        }
    }
    return newObj;
}

// POST /api/users endpoint for creating a new user
app.post('/api/users', async (req, res) => {
    try {
        // Get name, email, telegramId, and chatId from the request body
        const { name, email, telegramId, chatId } = req.body;

        // Validate that all required fields are present
        if (!name || !email || !telegramId || !chatId) {
            return res.status(400).json({ message: 'Name, email, telegramId, and chatId are required.' });
        }

        // Create a new user in the database using Prisma
        // Ensure telegramId and chatId are parsed to integers,
        // matching the expected type in your Prisma schema (e.g., BigInt in DB).
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                telegramId: parseInt(telegramId, 10), // Ensure base 10 for parseInt
                chatId: parseInt(chatId, 10)         // Ensure base 10 for parseInt
            },
        });

        // Convert any BigInt values in the newUser object to strings before sending the response
        const serializableUser = bigIntToString(newUser);

        res.status(201).json(serializableUser);
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 'P2002') {
            // P2002 is Prisma's error code for unique constraint violation
            return res.status(409).json({ status: 'error', message: 'Email, Telegram ID or Chat ID already exists.' });
        }
        res.status(500).json({ status: 'error', message: 'Failed to create user.' });
    }
});

// GET /api/users endpoint for fetching all users
app.get('/api/users', async (req, res) => {
    try {
        // Fetch all users from the database using Prisma
        const users = await prisma.user.findMany();

        // Convert any BigInt values in the fetched users array to strings
        // This ensures the JSON response can be properly serialized.
        const serializableUsers = bigIntToString(users);

        res.status(200).json(serializableUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch users.' });
    }
});

// PUT: Cập nhật người dùng hiện có
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, telegramId } = req.body;
        if (!name || !email || !telegramId) {
            return res.status(400).json({ message: 'Name, email, and telegramId are required.' });
        }
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) }, // Đảm bảo id là số nguyên
            data: {
                name,
                email,
                telegramId: parseInt(telegramId)
            },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
        res.status(500).json({ status: 'error', message: `Failed to update user ${id}.` });
    }
});

// DELETE: Xóa người dùng
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({
            where: { id: parseInt(id) }, // Đảm bảo id là số nguyên
        });
        res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
        console.error(`Error deleting user ${id}:`, error);
        res.status(500).json({ status: 'error', message: `Failed to delete user ${id}.` });
    }
});


app.get('/crud_session_management', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'components', 'crud_session_management.htm'));
});

// POST /api/sessions endpoint for creating a new session
app.post('/api/sessions', async (req, res) => {
    try {
        const { key, value } = req.body;

        if (!key || !value) {
            return res.status(400).json({ message: 'Key and value are required.' });
        }

        const newSession = await prisma.session.create({
            data: {
                key,
                value,
            },
        });
        res.status(201).json(newSession);
    } catch (error) {
        console.error('Error creating session:', error);
        if (error.code === 'P2002') {
            return res.status(409).json({ status: 'error', message: 'Session key already exists.' });
        }
        res.status(500).json({ status: 'error', message: 'Failed to create session.' });
    }
});

// GET /api/sessions endpoint for fetching all sessions
app.get('/api/sessions', async (req, res) => {
    try {
        const sessions = await prisma.session.findMany();
        res.status(200).json(sessions);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch sessions.' });
    }
});

// GET /api/sessions/:id endpoint for fetching a single session by ID
app.get('/api/sessions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const session = await prisma.session.findUnique({
            where: { id: parseInt(id) },
        });

        if (!session) {
            return res.status(404).json({ message: 'Session not found.' });
        }
        res.status(200).json(session);
    } catch (error) {
        console.error(`Error fetching session ${id}:`, error);
        res.status(500).json({ status: 'error', message: `Failed to fetch session ${id}.` });
    }
});

// PUT /api/sessions/:id endpoint for updating an existing session
app.put('/api/sessions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { key, value } = req.body;

        if (!key || !value) {
            return res.status(400).json({ message: 'Key and value are required.' });
        }

        const updatedSession = await prisma.session.update({
            where: { id: parseInt(id) },
            data: {
                key,
                value,
            },
        });
        res.status(200).json(updatedSession);
    } catch (error) {
        console.error(`Error updating session ${id}:`, error);
        if (error.code === 'P2002') {
            return res.status(409).json({ status: 'error', message: 'Session key already exists.' });
        }
        res.status(500).json({ status: 'error', message: `Failed to update session ${id}.` });
    }
});

// DELETE /api/sessions/:id endpoint for deleting a session
app.delete('/api/sessions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.session.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
        console.error(`Error deleting session ${id}:`, error);
        res.status(500).json({ status: 'error', message: `Failed to delete session ${id}.` });
    }
});


app.get('/api/getFilteredSessionsMap', async (req, res) => {
    try {
        // Assuming getFilteredSessions accepts query parameters like 'key' or 'value'
        const { key, value } = req.query;

        // Call the exported getFilteredSessions function
        const filteredSessionsMap = await getFilteredSessionsMap();

        // Convert any BigInt values in the fetched sessions array to strings
        const serializableSessions = bigIntToString(filteredSessionsMap);

        res.status(200).json(serializableSessions);
    } catch (error) {
        console.error('Error fetching filtered sessions:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch filtered sessions.' });
    }
});

module.exports = app;