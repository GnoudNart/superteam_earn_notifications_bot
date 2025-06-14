import { Bot, CommandContext, Context, GrammyError, HttpError, InlineKeyboard, session, SessionFlavor } from "grammy";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { freeStorage } from "@grammyjs/storage-free";
import * as dotenv from 'dotenv';
import { SocksProxyAgent } from "socks-proxy-agent";
import { allAvailableSkills } from "./interface/skills";

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


type MyContext = Context & SessionFlavor<SessionData> & ConversationFlavor<Context>;
type MyConversationContext = Context;

type MyConversation = Conversation<MyContext, MyConversationContext>;

const bot = new Bot<MyContext>(process.env.TELEGRAM_BOT_TOKEN!, {
    client: {
        baseFetchConfig: {
        agent: socksAgent,
        compress: true,
        },
    },
});

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

// bot.use(
//   session({
//     initial: createInitialSessionData
//     storage: freeStorage<SessionData>(bot.token),
//   }),
// );

bot.use(conversations());
async function cancelUSDValue(conversation: MyConversation, ctx: MyConversationContext) {
    await ctx.reply("Operation cancelled.");
    await conversation.external((ctx) => {
        replySettings(ctx);
    });
    return;
}
// Conversation for setting min/max values
async function setUSDValueConversation(conversation: MyConversation, ctx: MyConversationContext) {
    let listMessageId: number[] = [];
    const session = await conversation.external((ctx) => ctx.session);
    await ctx.reply("Please enter the minimum value (or 'x' to exit):");
    listMessageId.push(ctx.message?.message_id!)
    let minValue: number | null = null;
    while (minValue === null) {
        const { message } = await conversation.waitFor("message:text");
        const text = message?.text;

        if (text?.toLowerCase() === "x") {
            await cancelUSDValue(conversation,ctx);
            return;
        }

        const parsedValue = Number(text);
        if (isNaN(parsedValue) || parsedValue < 0) {
            await ctx.reply("Invalid input. Please enter a number >= 0, or 'x' to exit."); // this will send new message and work
            // await ctx.api.editMessageText(ctx.chatId!, listMessageId[0], "Invalid input. Please enter a number greater than or equal to 0, or 'x' to exit."); // Cannot edit user message
            // await ctx.editMessageText("Invalid input. Please enter a number greater than or equal to 0, or 'x' to exit."); // Bad Request 
        } else {
            minValue = parsedValue;
            await ctx.reply(`✅ Min value has been set to: ${minValue} ✅`);
            listMessageId.push(ctx.message?.message_id!);
        }
    }

    await ctx.reply("Please enter the maximum value (a number greater than or equal to the minimum value, or '*' for unlimited, or 'x' to exit).");
    listMessageId.push(ctx.message?.message_id!);

    let maxValue: number | null = null;
    while (maxValue === null) {
        const { message } = await conversation.waitFor("message:text");
        const text = message?.text;

        if (text?.toLowerCase() === "x") {
            await cancelUSDValue(conversation,ctx);
            return;
        }

        if (text === "*") {
            maxValue = Infinity;
        } else {
            const parsedValue = Number(text);
            if (isNaN(parsedValue) || parsedValue < minValue) {
                await ctx.reply(`Invalid input. Please enter a number >= ${minValue}, '*' for unlimited, or 'x' to exit.`);
                // TODO editMessage?
            } else {
                maxValue = parsedValue;
            }
        }
    }
    await ctx.reply(`✅ Min - Max Values successfully set to: ${minValue} - ${Number(maxValue)} ✅`);
    session.minValue = minValue;
    session.maxValue = maxValue;
    await conversation.external((ctx) => {
        ctx.session = session;
        replySettings(ctx);
    });    
}

// Register the conversation

bot.use(createConversation(setUSDValueConversation));
// Command to start the conversation
bot.command("setUSDValue", async (ctx) => {
  await ctx.conversation.enter("setUSDValueConversation");
});



function replyStart(ctx: MyContext) {
    let userName = ctx.message?.from.username || "User";
    let welcome = "Welcome, 🎉🍾 @userName 🎊🍻\n👋 You’ve joined @superteam_earn_notifications_bot – your all-in-one Superteam Earn Notifications assistant!".replace("@userName", userName);
    if (!ctx.message?.from.username) {
        // join on command without message
        welcome = "🎉🍾Welcome back🎊🍻\n👋 You’ve joined @superteam_earn_notifications_bot – your all-in-one Superteam Earn Notifications assistant!".replace("@userName", userName);
    }
    let firstTimeMessage = "Looks like this is your first visit with us, please go to /settings to set up notifications that suit your needs ^_^";
    let content = "Some basic commands:\n/newest5 - Show 5 newest bounties campain\n/forme5 Show 5 bounties that fit your preference\n/settings - Setup your preference\n/help - Show help"
    let message = welcome + "\n\n" + (ctx.session.hasSet?"":firstTimeMessage + "\n\n") + content;
    const startInlineKeyboard = new InlineKeyboard()
    .text("🆕 5 Newest Campaigns","startNewestCampaign")
    .text("🎯 5 Campaigns for me","startCampaigns")
    .url("🌍 Earn Website","https://earn.superteam.fun/")
    .row()
    .text("🗄 My Saved Campaign","startSavedCampaigns")
    .row()
    .text("⚙️ Settings","startSettings").text("⁉️ Help","startHelp")

    ctx.reply(message, {
        reply_markup: startInlineKeyboard,
    });
}


// Handle the /start command.
bot.command("start", (ctx) => replyStart(ctx));

// Handle the /help command.
bot.command("help", (ctx) => {
    ctx.reply("This bot notifies you about new bounties and projects on Superteam Earn.\nUse command /start to get started.\nUse command /settings to setup your preference.")
});

bot.command("setMinValue", (ctx) => {
    if (Number(ctx.match) || Number(ctx.match) === 0) {
        ctx.session.minValue = Number(ctx.match)
    }
});

bot.command("setMaxValue", (ctx) => {
    if (Number(ctx.match) || Number(ctx.match) === 0) {
        ctx.session.maxValue = Number(ctx.match)
    }
});

function getSettingMessage(ctx: MyContext) {
    const session = ctx.session;
    let bountyType = (session.isBounties?"Bounties":"") + (session.isBounties && session.isProjects?" \\+ ":"") + (session.isProjects?"Projects":"")
    let isEnableNotification = session.isEnableNoti?"🔔":"🔕";
    let notiText = (!session.isEnableNoti?"🔔":"🔕") + " " + (session.isEnableNoti?"Turn off Notifications":"Turn on Notification");
    let message = 
    `⚙️ Setup your notification preferences ⚙️                                          

    *💵 USD Range*: ${session.minValue} \\- ${session.maxValue} 💲\\.

    *💰 Bounty Type*: ${bountyType}\\.

    *🎯 Skills*: ${session.skills.join("\\, ").replace("++","\\+\\+")}\\.

    *📧 Enable Notifications*: ${isEnableNotification}\\.

    *🌐 Location*: ${session.location}\\.
    `
    const settingsInlineKeyboard = new InlineKeyboard()
    .text("💵 Set USD Range","setUSDValue")
    .row()
    .text("💰 Set Bounty Type","settingsBountyType")
    .row()
    .text("🎯 Set Skill Set","setSkills")
    .row()
    .text(notiText,"settingNoti")
    .row()
    .text("🏘 Back to main page","settingsBack");
    return {
        message:message,
        settingsInlineKeyboard: settingsInlineKeyboard
    };
}

function replyEditSettings(ctx: MyContext) {
    ctx.session.hasSet = true;
    let { message, settingsInlineKeyboard} = getSettingMessage(ctx);
    try {
        ctx.editMessageText(message,{
            parse_mode: "MarkdownV2",
            reply_markup: settingsInlineKeyboard,
        });
    } catch (err) {
        console.error("Some thing happend", err);
        replySettings(ctx);
    }
}

function replySettings(ctx: MyContext) {
    ctx.session.hasSet = true;
    let { message, settingsInlineKeyboard} = getSettingMessage(ctx);
    try {
        ctx.reply(message, {
        parse_mode: "MarkdownV2",
        reply_markup: settingsInlineKeyboard,
    });
    } catch (err) {
        console.error("Some thing happend", err);
        replyStart(ctx);
    }
}

function editReplyBountyType(ctx: any) {
    const isBounties = ctx.session.isBounties;
    const isProjects = ctx.session.isProjects;
    const setBountyTypeInlineKeyboard = new InlineKeyboard()
    .text((isBounties?"✅":"☑️") + " Bounties","setBountyTypeBounties")
    .text((isProjects?"✅":"☑️") + " Projects","setBountyTypeProjects")
    .row()
    .text("⚙️ Back to settings","backBountyType");
    let currentType = (isBounties?"Bounties":"") + (isBounties && isProjects?" + ":"") + (isProjects?"Projects":"")
    let messageText = "Set your bounties type: " + currentType;
    const spaceLine = `\n${" ".repeat(100)}&#x200D;\n`;
    messageText = messageText + spaceLine;
    
    ctx.editMessageText(messageText,{
        parse_mode: "HTML",
        reply_markup: setBountyTypeInlineKeyboard,
    });
}

function editReplyMinValue(ctx: any) {
    const minValueInlineKeyboard = new InlineKeyboard()
    .text("-100","minValueSub100")
    .text("-10","minValueSub10")
    .text(ctx.session.minValue,"minValueCheck")
    .text("+10","minValueAdd10")
    .text("+100","minValueAdd100")
    .row()
    .text("Back to settings","minValueBack")
    .row()
    .copyText("Copy command example","/setMinValue " + ctx.session.minValue)
    ctx.editMessageText("Curent Min Value của bạn: " + ctx.session.minValue,{
        reply_markup: minValueInlineKeyboard,
    });
}


function editReplyMaxValue(ctx: any) {
    const maxValueInlineKeyboard = new InlineKeyboard()
    .text("-1000","maxValueSub1000")
    .text("-100","maxValueSub100")
    .copyText(ctx.session.maxValue,"/setMaxValue " + ctx.session.maxValue)
    .text("+100","maxValueAdd100")
    .text("+1000","maxValueAdd1000")
    .row()
    .text("Back to settings","maxValueBack")
    .row()
    .copyText("Copy command example","/setMaxValue " + ctx.session.maxValue)
    ctx.editMessageText("Curent Max Value của bạn: " + ctx.session.maxValue,{
        reply_markup: maxValueInlineKeyboard,
    });
}

function formatTextToEqualBlockWidth(string: string) {
    // Special zero-width connector in hex format that doesn't cut off the bot:
    const nullSeparator = '&#x200D;';
    // The maximum number of characters, upon reaching the number of which the bot starts to stretch the width of the block with buttons:
    const maxNumberOfSymbol = 129;
    // Pad the right side of each new line with spaces and a special character, thanks to which the bot does not cut off these spaces, and then add them to the array:
    let resultStringArray = [];
    while (string.length) {
        // Get a substring with the length of the maximum possible width of the option block:
        let partOfString = string.substring(0, maxNumberOfSymbol).trim();
        // Find the first space on the left of the substring to pad with spaces and a line break character:
        let positionOfCarriageTransfer = string.length < maxNumberOfSymbol ? string.length : partOfString.lastIndexOf(' ');
        positionOfCarriageTransfer = positionOfCarriageTransfer == -1 ? partOfString.length : positionOfCarriageTransfer;
        // Pad the substring with spaces and a line break character at the end:
        partOfString = partOfString.substring(0, positionOfCarriageTransfer)
        partOfString = partOfString + new Array(maxNumberOfSymbol - partOfString.length).join(' ') + nullSeparator;
        // Add to array of strings:
        resultStringArray.push(`<code>${partOfString}</code>`);
        // Leave only the unprocessed part of the string:
        string = string.substring(positionOfCarriageTransfer).trim();
    }
    // Send a formatted string as a column equal to the maximum width of the message that the bot does not deform:

    return resultStringArray.join('\n');
}



function editReplySkills(ctx: MyContext) {
    let currentSkills = ctx.session.skills;
    let messageString = "";
    const nullSeparator = '&#x200D;';
    const spaceLine = `\n${" ".repeat(180)}&#x200D;\n`;
    messageString = `Your current skills: ${currentSkills.join(", ")}`;
    messageString = messageString + spaceLine;
    const buttonRow = allAvailableSkills.map((skillName) => {
        let isMySkill = currentSkills.indexOf(skillName) >= 0;
        let checkIcon = isMySkill?"✅":""
        return InlineKeyboard.text(checkIcon + skillName, "skills" + skillName);
    });
    const skillsInlineKeyboard = InlineKeyboard.from([buttonRow]).toFlowed(5)
    .row()
    .text("Back to settings","backSkills");
    ctx.editMessageText(messageString,{
        parse_mode: "HTML",
        reply_markup: skillsInlineKeyboard,
    });
}

// Handle the /settings command.
bot.command("settings", (ctx) => {
    replySettings(ctx);
});

// Handle other messages.
bot.on("message", (ctx) => {
    console.log("Got another message!: " + ctx.message.text);
});

bot.callbackQuery('settingsBountyType', ctx => { 
    editReplyBountyType(ctx);
});

bot.callbackQuery('setMinValue', ctx => { 
    editReplyMinValue(ctx);
});

bot.callbackQuery('setMaxValue', ctx => { 
    editReplyMaxValue(ctx);
});

bot.callbackQuery('setSkills', ctx => { 
    editReplySkills(ctx);
});

bot.callbackQuery('startNewestCampaign', ctx => { 
    // ASD
    ctx.answerCallbackQuery(); // remove loading animation
});

bot.callbackQuery('startCampaigns', ctx => { 
    // ASD
    ctx.answerCallbackQuery(); // remove loading animation
});
bot.callbackQuery('startSettings', ctx => { 
    replySettings(ctx);
});
bot.callbackQuery('startHelp', ctx => { 
    ctx.reply("This bot notifies you about new bounties and projects on Superteam Earn.\nUse command /start to get started.\nUse command /settings to setup your preference.");
});

bot.callbackQuery('settingsBack', ctx => { 
    replyStart(ctx);
});

bot.callbackQuery('settingNoti', async ctx => { 
    ctx.session.isEnableNoti = !ctx.session.isEnableNoti;
    await ctx.answerCallbackQuery(`Notifications has been set to: ${ctx.session.isEnableNoti?"On":"Off"}`);
    replyEditSettings(ctx);
});

bot.callbackQuery('setUSDValue', async ctx => { 
    await ctx.conversation.enter("setUSDValueConversation");
});

async function updateSkill(ctx: MyContext, skill: string) {
    let currentSkills = ctx.session.skills;
    let skillIndex = currentSkills.indexOf(skill);
    try {
        if (skillIndex >= 0 ) {
            ctx.session.skills.splice(skillIndex, 1);
            await ctx.answerCallbackQuery(`${skill} Skill removed`);
        } else {
            ctx.session.skills.push(skill);
            await ctx.answerCallbackQuery(`${skill} Skill added`);
        }
    } catch (err) {
        // console.error(err);
    }
}

async function updateAndReplyBountyType(ctx: MyContext, bountyType: string) {
    let flag = false;
    if (bountyType.toLowerCase() === "bounties") {
        ctx.session.isBounties = !ctx.session.isBounties
        flag = ctx.session.isBounties;
    }
    if (bountyType.toLowerCase() === "projects") {
        ctx.session.isProjects = !ctx.session.isProjects
        flag = ctx.session.isProjects;
    }
    await ctx.answerCallbackQuery(`${bountyType} notifications has set to: ${flag?"On":"Off"}`);
    editReplyBountyType(ctx)
}

bot.on("callback_query:data", async (ctx) => {
    if (ctx.callbackQuery.data.startsWith("skills")) {
        let data = ctx.callbackQuery.data;
        let skill = data.substring(6,data.length);
        updateSkill(ctx,skill);
        editReplySkills(ctx);
        return;
    }
    if (ctx.callbackQuery.data.startsWith("setBountyType")) {
        let data = ctx.callbackQuery.data;
        let bountyType = data.substring("setBountyType".length,data.length);
        updateAndReplyBountyType(ctx,bountyType);
        return;
    }
    switch (ctx.callbackQuery.data) {
        case "minValueAdd10":
            ctx.session.minValue += 10;
            editReplyMinValue(ctx)
            break;
        case "minValueAdd100":
            ctx.session.minValue += 100;
            editReplyMinValue(ctx)
            break;
        case "minValueSub10":
            ctx.session.minValue = Math.max(ctx.session.minValue - 10, 0);
            editReplyMinValue(ctx)
            break;
        case "minValueSub100":
            ctx.session.minValue = Math.max(ctx.session.minValue - 100, 0);
            editReplyMinValue(ctx)
            break;

            // max
        case "maxValueAdd100":
            ctx.session.maxValue += 100;
            editReplyMaxValue(ctx)
            break;
        case "maxValueAdd1000":
            ctx.session.maxValue += 1000;
            editReplyMaxValue(ctx)
            break;
        case "maxValueSub100":
            ctx.session.maxValue = Math.max(ctx.session.maxValue - 100, 0);
            editReplyMaxValue(ctx)
            break;
        case "maxValueSub1000":
            ctx.session.maxValue = Math.max(ctx.session.maxValue - 1000, 0);
            editReplyMaxValue(ctx)
            break;
            
        case "backBountyType":
        case "minValueBack":
        case "maxValueBack":
        case "backSkills":
            replyEditSettings(ctx)
            break;
        default:
            console.log("Unknown button event with payload", ctx.callbackQuery.data);
            await ctx.answerCallbackQuery("Comming Soon"); // remove loading animation
    }
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
  { command: "newest5", description: "🆕 5 Newest Campaigns" },
  { command: "forme5", description: "🎯 5 Campaigns for me" },
  { command: "saved", description: "🧩 My saved campaigns" },
]);

// Start the bot.
console.log("Starting the bot...")
bot.start()
.then(() => console.log("Bot is running..."))
.catch((err) => console.error("Failed to launch bot:", err));;