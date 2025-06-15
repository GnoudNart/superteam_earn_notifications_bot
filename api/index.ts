require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
import { webhookHandler } from '../src/bot';
import { getUserIdsFromDatabase } from '../src/database'; // Giả sử bạn có hàm này để lấy user IDs


// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Parse JSON bodies for Telegram webhook
app.use(express.json());

app.get('/', (req, res) => {
  // Send a simple success message as a response
  res.status(200).send('Server test thành công! Chào mừng bạn đến với API.');
});


// const webhookHandler = (req, res) => {
//   console.log('Webhook received!', req.body);
//   res.status(200).send('OK'); // Telegram expects a 200 OK
// };

// Handle webhook updates from Telegram
app.post('/webhook', webhookHandler);

app.get('/test', (req, res) => {
  // Log the received JSON body to the console.
  // `req.body` is populated by `express.json()` middleware.
  console.log('Received POST request with body:', req.body);

  // Check if the request body is empty or not
  if (Object.keys(req.body).length === 0) {
    // If no JSON data was sent, send a specific message
    return res.status(200).json({
      success: true,
      message: 'POST request thành công! Không có dữ liệu JSON nào được gửi.'
    });
  }

  // Send a JSON response indicating success and echoing the received data
  res.status(200).json({
    success: true,
    message: 'POST request thành công và dữ liệu JSON đã được nhận!',
    receivedData: req.body // Include the data received from the client
  });
});

app.get('/manual-send-notifications', async (req, res) => {
  try {
    console.log('Manual cron job for sending notifications triggered!');

    const userIds = await getUserIdsFromDatabase(); // Lấy user IDs từ database

    if (userIds.length === 0) {
      console.log('No users to send notifications to.');
      return res.status(200).send('No users found to send notifications to.');
    }

    for (const userId of userIds) {
      try {
        await bot.api.sendMessage(userId, 'Đây là thông báo định kỳ của bạn từ bot (manual test)!'); //
        console.log(`Notification sent to user: ${userId}`);
      } catch (error) {
        console.error(`Failed to send message to user ${userId}:`, error);
        // Xử lý lỗi cụ thể, ví dụ: xóa người dùng nếu bot bị chặn
      }
    }

    console.log('Manual cron job for sending notifications finished.');
    res.status(200).send('Notifications sent successfully (manual test)!');
  } catch (error) {
    console.error('Error in manual cron job:', error);
    res.status(500).send('Error sending notifications (manual test).');
  }
});


module.exports = app;