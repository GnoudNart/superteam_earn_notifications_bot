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


module.exports = app;