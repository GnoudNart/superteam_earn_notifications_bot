require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// const { bot, webhookHandler } = require('../src/bot');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Parse JSON bodies for Telegram webhook
app.use(express.json());

app.get('/', (req, res) => {
  // Send a simple success message as a response
  res.status(200).send('Server test thành công! Chào mừng bạn đến với API.');
});


// Handle webhook updates from Telegram
// app.post('/webhook', webhookHandler);

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



module.exports = app;