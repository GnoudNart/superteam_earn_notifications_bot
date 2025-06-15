import { Bot, Context, GrammyError, HttpError, session, SessionFlavor, webhookCallback } from "grammy";
import {
    type ConversationFlavor,
    conversations,
} from "@grammyjs/conversations";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


const socksAgent = new SocksProxyAgent(process.env.PROXY_HOST!);

// Define the SessionData structure. 
interface SessionData {
    activeMessageId: number;
    minValue: number;
    maxValue: number;
    isBounties: boolean;
    isProjects: boolean;
    skills: string[];
    location: string;
    hasSet: boolean;
    isEnableNoti: boolean;
}


export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor<Context>;

let botConfig = {};
if (process.env.USE_PROXY) {
    botConfig = {
        client: {
            baseFetchConfig: {
                agent: socksAgent,
                compress: true,
            },
        },
    }
}

export const bot = new Bot<MyContext>(process.env.TELEGRAM_BOT_TOKEN!, botConfig);

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

export const webhookHandler = webhookCallback(bot, 'express'))
