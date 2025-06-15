require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
import { webhookHandler } from '../src/bot';
import { bot, MyContext } from '../src/bot';
import { getUserIdsFromDatabase, checkDatabaseConnection, prisma } from '../src/database'; // Import checkDatabaseConnection và prisma

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


app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany(); // Giả sử bạn có model 'User' trong Prisma schema của mình
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch users from database.' });
    }
});

// Thêm các API endpoint cho CRUD operations (sẽ cần cho bước sau)
// POST: Tạo người dùng mới
app.post('/api/users', async (req, res) => {
    try {
        const { name, email, telegramId } = req.body;
        if (!name || !email || !telegramId) {
            return res.status(400).json({ message: 'Name, email, and telegramId are required.' });
        }
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                telegramId: parseInt(telegramId)
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        // Xử lý lỗi unique constraint cụ thể
        if (error.code === 'P2002') {
            return res.status(409).json({ status: 'error', message: 'User with this email or Telegram ID already exists.' });
        }
        res.status(500).json({ status: 'error', message: 'Failed to create user.' });
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



module.exports = app;