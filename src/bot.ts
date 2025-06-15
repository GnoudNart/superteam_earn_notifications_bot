import { Bot, Context, GrammyError, HttpError, session, SessionFlavor, webhookCallback } from "grammy";
import {
    type ConversationFlavor,
    conversations,
} from "@grammyjs/conversations";
import * as dotenv from 'dotenv';
import { SocksProxyAgent } from "socks-proxy-agent";

// Import PrismaClient and PrismaAdapter
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@grammyjs/storage-prisma";

import start from "./handlers/start";
import settings, { replySettings } from "./handlers/settings";
import help from "./handlers/help";
import bounty from "./handlers/bounty";
import skills from "./handlers/skills";
import valueUSD from "./handlers/valueUSD";
import { SessionData } from './type'

dotenv.config();

export const prisma = new PrismaClient();

const socksAgent = process.env.USE_PROXY ? new SocksProxyAgent(process.env.PROXY_HOST!) : undefined;



export type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor<Context>;

let botConfig = {};
if (process.env.USE_PROXY && socksAgent) {
    botConfig = {
        client: {
            baseFetchConfig: {
                agent: socksAgent,
                compress: true,
            },
        },
    };
}

export const bot = new Bot<MyContext>(process.env.TELEGRAM_BOT_TOKEN!, botConfig);

// Creates a new object that will be used as initial SessionData data.
function createInitialSessionData() {
    let emptySkills: string[] = [];
    return {
        activeMessageId: 0,
        minValue: 0,
        maxValue: Number(Infinity),
        isBounties: true,
        isProjects: true,
        skills: emptySkills,
        location: "global",
        hasSet: false,
        isEnableNoti: true,
    };
}

bot.use(session({
    initial: createInitialSessionData,
    storage: new PrismaAdapter(prisma.session)
}));

// Use conversation middleware for multi-step interactions
bot.use(conversations());

// Register your bot handlers
bot.use(start);
bot.use(settings);
bot.use(help);
bot.use(bounty);
bot.use(skills);
bot.use(valueUSD);

// Handle other messages (not explicitly handled by other middleware)
bot.on("message", (ctx) => {
    console.log("Got message!: " + ctx.message.text);
});

// Handle unknown callback queries
bot.on("callback_query:data", async (ctx) => {
    console.log("Unknown button event with payload fallback here: ", ctx.callbackQuery.data);
    await ctx.answerCallbackQuery("Coming Soon!"); // Corrected typo: "Comming" to "Coming"
});

// Error handling middleware
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});


bot.api.setMyCommands([
    { command: "start", description: "🏘 Start the bot at main page" },
    { command: "settings", description: "⚙️ Setup your preference" },
    { command: "help", description: "❓Help" },
    { command: "newest", description: "🆕 Some Newest Campaigns" },
    { command: "forme", description: "🎯 Campaigns for me" },
    { command: "saved", description: "🧩 My saved campaigns" },
]);

// Start the bot.
// console.log("Starting the bot...")
// bot.start()
//     .then(() => console.log("Bot is running..."))
//     .catch((err) => console.error("Failed to launch bot:", err));
//

export const webhookHandler = webhookCallback(bot, 'express')
