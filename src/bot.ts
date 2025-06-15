import { Bot, Context, GrammyError, HttpError, session, SessionFlavor, webhookCallback } from "grammy";
import {
    type ConversationFlavor,
    conversations,
} from "@grammyjs/conversations";
import * as dotenv from 'dotenv';
import { SocksProxyAgent } from "socks-proxy-agent";
import start from "./handlers/start";
import settings, { replySettings } from "./handlers/settings";
import help from "./handlers/help";
import bounty from "./handlers/bounty";
import skills from "./handlers/skills";
import valueUSD from "./handlers/valueUSD";

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

bot.use(session({ initial: createInitialSessionData }));
bot.use(conversations());
bot.use(start);
bot.use(settings);
bot.use(help);
bot.use(bounty);
bot.use(skills);
bot.use(valueUSD);

// Handle other messages.
bot.on("message", (ctx) => {
    console.log("Got message!: " + ctx.message.text);
});

bot.on("callback_query:data", async (ctx) => {
    console.log("Unknown button event with payload fallback here: ", ctx.callbackQuery.data);
    await ctx.answerCallbackQuery("Comming Soon!");
});

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

export const webhookHandler = webhookCallback(bot);
