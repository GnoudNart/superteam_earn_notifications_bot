import { Bot, Context, GrammyError, HttpError, session, SessionFlavor, webhookCallback } from "grammy";
import {
    type ConversationFlavor,
    conversations,
} from "@grammyjs/conversations";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize the bot with the token from .env
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

// Handle /start command
bot.start((ctx) => {
  ctx.reply('Welcome to the Superteam Earn Notifications Bot!');
});

// Handle /help command
bot.help((ctx) => {
  ctx.reply('This bot notifies you about new bounties and projects on Superteam Earn.');
});

// Start the bot.
// console.log("Starting the bot...")
// bot.start()
//     .then(() => console.log("Bot is running..."))
//     .catch((err) => console.error("Failed to launch bot:", err));
//

module.exports = {
  bot,
  webhookHandler: webhookCallback(bot),
};