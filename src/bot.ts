import { Bot, CommandContext, Context, GrammyError, HttpError, InlineKeyboard, session, SessionFlavor } from "grammy";
import { freeStorage } from "@grammyjs/storage-free";
import * as dotenv from 'dotenv';
import { SocksProxyAgent } from "socks-proxy-agent";

dotenv.config();


const socksAgent = new SocksProxyAgent(process.env.PROXY_HOST!);

// Define the UserPreferences structure. 
interface UserPreferences {
    minValue: number;
    maxValue: number;
    bountyType: string;
    skills: string[];
    location: string;
    hasSet: boolean;
}
type MyContext = Context & SessionFlavor<UserPreferences>;

const bot = new Bot<MyContext>(process.env.TELEGRAM_BOT_TOKEN!, {
    client: {
        baseFetchConfig: {
        agent: socksAgent,
        compress: true,
        },
    },
});

// Creates a new object that will be used as initial UserPreferences data.
function createInitialUserPreferences() {
    let emptySkills: string[] = [];
    return {
        minValue: 0,
        maxValue: 100000000,
        bountyType: "both",
        skills: emptySkills,
        location: "global",
        hasSet: false,
    };
}

bot.use(session({ initial: createInitialUserPreferences }));

// bot.use(
//   session({
//     initial: createInitialUserPreferences,
//     storage: freeStorage<UserPreferences>(bot.token),
//   }),
// );

function replyStart(ctx: MyContext) {
    let userName = ctx.message?.from.username || "User";
    let welcome = "Welcome, 🎉🍾 @userName 🎊🍻\n👋 You’ve joined @superteam_earn_notifications_bot – your all-in-one Superteam Earn Notifications assistant!".replace("@userName", userName);
    let firstTimeMessage = "Looks like this is your first visit with us, please go to /settings to set up notifications that suit your needs ^_^";

    let content = "Some basic commands:\n/newest5 - Show 5 newest bounties campain\n/forme5 Show 5 bounties that fit your preference\n/settings - Setup your preference\n/help - Show help"
    let message = welcome + "\n\n" + (ctx.session.hasSet?"":firstTimeMessage + "\n\n") + content;
    const startInlineKeyboard = new InlineKeyboard()
    .text("🆕 5 Newest Campaigns","startNewestCampaign")
    .text("🎯 5 Campaigns for me","startCampaigns")
    .url("🌍 Earn Website","https://earn.superteam.fun/")
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
    console.log("Receive hekap");
    ctx.reply("This bot notifies you about new bounties and projects on Superteam Earn. Use command /settings to setup your preference")
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

function replySettings(ctx: MyContext) {
    ctx.session.hasSet = true;
    const settingsInlineKeyboard = new InlineKeyboard()
    .text("Set Min Value","setMinValue")
    .text("Set Max Value","setMaxValue")
    .row()
    .text("Set Bounty Type","settingsBountyType")
    .text("Set Skill Set","setSkills")
    .row()
    .text("Back to main page","settingsBack");
    ctx.reply("Current settings của bạn:" + JSON.stringify(ctx.session), {
        reply_markup: settingsInlineKeyboard,
    });
}

function editReplyBountyType(ctx: any) {
    const setBountyTypeInlineKeyboard = new InlineKeyboard()
    .text("Bounties","setBountyTypeBounties")
    .text("Project","setBountyTypeProjects")
    .text("Both","setBountyTypeBoth")
    .row()
    .text("Back to settings","backBountyType");
    ctx.editMessageText("Curent Bounty Type của bạn: " + ctx.session.bountyType,{
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

function editReplySkills(ctx: any) {
    const skillsInlineKeyboard = new InlineKeyboard()
    .text("FrontEnd","skillsFrontEnd")
    .text("BackEnd","skillsBackEnd")
    .text("Blockchain","skillsBlockchain")
    .text("ProjectManager","skillsPM")
    .text("Web3","skillsWeb3")
    .row()
    .text("Javascript","skillsJavascript")
    .text("Python","skillsPython")
    .text("Golang","skillsGolang")
    .text("Java","skillsJava")
    .text("Rust","skillsRust")
    .row()
    .text("Back to settings","backSkills")
    ctx.editMessageText("Curent Skill của bạn: " + ctx.session.skills,{
        reply_markup: skillsInlineKeyboard,
    });
}

// Handle the /settings command.
bot.command("settings", (ctx) => {
    replySettings(ctx);
});

// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!: " + ctx.message));

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
    //ADS
    ctx.answerCallbackQuery(); // remove loading animation
});

bot.callbackQuery('settingsBack', ctx => { 
    replyStart(ctx);
});

function updateSkill(ctx: MyContext, skill: string) {
    let currentSkills = ctx.session.skills;
    let skillIndex = currentSkills.indexOf(skill);
    if (skillIndex >= 0 ) {
        ctx.session.skills.splice(skillIndex, 1);
    } else {
        ctx.session.skills.push(skill);
    }
}

function updateAndReplyBountyType(ctx: MyContext, bountyType: string) {
    if (ctx.session.bountyType === bountyType) {
        ctx.answerCallbackQuery(); // do nothing here
    } else {
        ctx.session.bountyType = bountyType;
        editReplyBountyType(ctx)
    }
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
            replySettings(ctx)
            break;
        default:
            console.log("Unknown button event with payload", ctx.callbackQuery.data);
            await ctx.answerCallbackQuery(); // remove loading animation
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
]);

// Start the bot.
console.log("Starting the bot...")
bot.start()
.then(() => console.log("Bot is running..."))
.catch((err) => console.error("Failed to launch bot:", err));;