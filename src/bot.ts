import { Telegraf } from 'telegraf';
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

// Launch the bot
bot.launch()
  .then(() => console.log('Bot is running...'))
  .catch((err) => console.error('Failed to launch bot:', err));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));