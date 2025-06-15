import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot';
import { replySettings } from './settings';
import { replyHelp } from './help';
import { wrapperMarkdown } from '../utils';

const composer = new Composer<MyContext>();

const getStartMessage = (ctx: MyContext) => {
    let userName = ctx.message?.from.username || "User";
    let welcome = `Welcome, 🎉🍾 ${userName} 🎊🍻\n👋 You’ve joined @superteam_earn_notifications_bot – your all-in-one Superteam Earn Notifications assistant!`;
    if (!ctx.message?.from.username) {
        // join on command without message
        welcome = `🎉🍾Welcome back🎊🍻\n👋 You’ve joined @superteam_earn_notifications_bot – your all-in-one Superteam Earn Notifications assistant!`;
    }
    let firstTimeMessage = "<blockquote>Looks like this is your first visit with us, please go to /settings to set up notifications that suit your needs 😄😄😄</blockquote>";
    let content = "<blockquote>Some basic commands:\n/newest - Show some newest bounties campain\n/forme Show some bounties that fit your preference\n/start - Start bot at homepage\n/settings - Setup your preference\n/help - Show help</blockquote>"
    let message = welcome + "\n\n" + (ctx.session.hasSet?"":firstTimeMessage + "\n\n") + content;
    const startInlineKeyboard = new InlineKeyboard()
    .text("🆕 Newest Campaigns","startNewestCampaign")
    .text("🎯 Campaigns for me","startCampaigns")
    .url("🌍 Earn Website","https://earn.superteam.fun/")
    .row()
    .text("🗄 My Saved Campaign","startSavedCampaigns")
    .row()
    .text("⚙️ Settings","startSettings").text("⁉️ Help","startHelp");

    return {
        message:message,
        startInlineKeyboard: startInlineKeyboard
    };
}

export const replyStart = (ctx: MyContext, isEdit: boolean = false) => {
    let { message, startInlineKeyboard} = getStartMessage(ctx);

    try {
        if (isEdit) {
            ctx.editMessageText(message, {
                parse_mode: "HTML",
                reply_markup: startInlineKeyboard,
            }).catch(e => {
                console.log(e)
                replyStart(ctx);
            });
        } else {
            ctx.reply(message, {
                parse_mode: "HTML",
                reply_markup: startInlineKeyboard,
            }).catch(e => {
                console.log(e)
            });
        }
    } catch (err) {

    }
}

const handleNewst = async (ctx: MyContext) => {
    let newCampaigns = [
        {
        "id": "ffcbf5cc-99da-4ab1-ae72-b792cec83cfc",
        "rewardAmount": 4000,
        "deadline": "2025-06-14T10:32:20.701Z",
        "type": "project",
        "title": "Frontend/Fullstack Engineer - Sentient Struggle",
        "token": "USDC",
        "winnersAnnouncedAt": null,
        "slug": "frontendfullstack-engineer-grit-labs",
        "isWinnersAnnounced": false,
        "isFeatured": false,
        "compensationType": "fixed",
        "minRewardAsk": null,
        "maxRewardAsk": null,
        "status": "OPEN",
        "_count": {
            "Comments": 12,
            "Submission": 118
        },
        "sponsor": {
            "name": "Grit Labs",
            "slug": "gritlabs",
            "logo": "https://res.cloudinary.com/dgvnuwspr/image/upload/v1748687162/fst6ubgmtkncdumue9wu.png",
            "isVerified": false,
            "st": false
        },
        "skills": [
            "Solidity",
            "Ruby on Rails",
            "Other",
            "Photography",
            "Other"
        ],
        "deadline_utc_parsed": "2025-06-14T10:32:20.701Z",
        "region": "MALAYSIA",
        "publishedAt": "2025-06-12T10:32:20.701Z"
    },
    {
        "id": "a085ae72-fdff-4697-8574-0c6b8e4e2279",
        "rewardAmount": 200,
        "deadline": "2025-06-20T20:30:11.140Z",
        "type": "bounty",
        "title": "Frontrun.pro X & Reddit Power-Poster Contest — Drive Beta Sign-Ups, Grab USDC",
        "token": "USDC",
        "winnersAnnouncedAt": null,
        "slug": "frontrunpro-x-and-reddit-power-poster-contest-drive-beta-sign-ups-grab-usdc",
        "isWinnersAnnounced": false,
        "isFeatured": false,
        "compensationType": "fixed",
        "minRewardAsk": null,
        "maxRewardAsk": null,
        "status": "OPEN",
        "_count": {
            "Comments": 0,
            "Submission": 3
        },
        "sponsor": {
            "name": "Frontrun.pro",
            "slug": "frontrunpro",
            "logo": "https://res.cloudinary.com/dgvnuwspr/image/upload/v1749237985/dxackt3lo1f3yn4dkyhl.png",
            "isVerified": false,
            "st": false
        },
        "skills": [
            "Video",
            "MongoDB",
            "Presentation Design",
            "Django",
            "Go",
            "Product Manager"
        ],
        "deadline_utc_parsed": "2025-06-20T20:30:11.140Z",
        "region": "BALKAN",
        "publishedAt": "2025-06-18T20:30:11.140Z"
    }
    ]
    sendNotifications(ctx,newCampaigns);
}

const handleForMe = async (ctx: MyContext) => {
    let filterCampaigns = [];
    sendNotifications(ctx,filterCampaigns);
}

const sendNotifications = (ctx: MyContext, notificationsData) => {
    for (let notificationData of notificationsData) {
        sendNotification(ctx,notificationData)
    }
}

const sendNotification = (ctx: MyContext, notificationData: any) => {
    let title = `New ${notificationData.type.toUpperCase()}: ${notificationData.title}`;
    let rewardToken = (notificationData.rewardAmount?notificationData.rewardAmount:"") + " " + notificationData.token;
    let usdValue = "";
    if (notificationData.compensationType === "variable") {
        usdValue = "Variable Comp"
    }
    if (notificationData.compensationType === "fixed") {
        usdValue = rewardToken
    }
    if (notificationData.compensationType === "range") {
        usdValue = notificationData.minRewardAsk + " - " + notificationData.maxRewardAsk;
    }
    let url = "https://earn.superteam.fun/listing/" + notificationData.slug + "/?utm_source=telegrambot"
    let deadline = new Date(notificationData.deadline).toUTCString();
    let notificationMessage = 
    
    `*⚡️                                        ⭐️${wrapperMarkdown(` New ${notificationData.type.toUpperCase()}`)}⭐️                                        ⚡️*
    __*🔥 ${wrapperMarkdown(notificationData.title)} 🔥*__                                          

    *🌟 Sponsor*: ${wrapperMarkdown(notificationData.sponsor.name)}\\.
    *🎁 Reward Token*: ${wrapperMarkdown(rewardToken)}\\.
    *💲 USD value*: ${wrapperMarkdown(usdValue)}\\.
    *🎯 Skills*: ${wrapperMarkdown(notificationData.skills.join(", "))}\\.
    *⏰ Deadline*: ${wrapperMarkdown(deadline)}\\.
    [Apply Now](${url})
    `
    try {
        ctx.reply(notificationMessage,{
            parse_mode: "MarkdownV2",
            link_preview_options: {
                is_disabled:true,
            }
        }).catch(e => {
            console.error("Some thing happend", e);
        });
    } catch (err) {
        console.error("Some thing happend", err);
    }
}

// register command
composer.command('start', (ctx) => {
    let payload = ctx.match;
    if (payload.length) {
      const url = Buffer.from(payload, 'base64').toString();
      const params = Object.fromEntries(new URLSearchParams(url).entries());
      if (params.location) {
        ctx.session.location = params.location;
      }
    }
    replyStart(ctx);
});

composer.command('start', (ctx) => {
    let payload = ctx.match;
    if (payload.length) {
      const url = Buffer.from(payload, 'base64').toString();
      const params = Object.fromEntries(new URLSearchParams(url).entries());
      if (params.location) {
        ctx.session.location = params.location;
      }
    }
    replyStart(ctx);
});

composer.command('newest', (ctx) => {
    handleNewst(ctx);
});

composer.command('forme', (ctx) => {
    handleForMe(ctx);
});

// register callback Query
composer.callbackQuery('startNewestCampaign', ctx => { 
    handleNewst(ctx);
});

composer.callbackQuery('startCampaigns', ctx => { 
    handleForMe(ctx);
});

composer.callbackQuery('startSavedCampaigns', ctx => { 
    ctx.answerCallbackQuery("Show user's saved campaigns, Comming Soon!!!").catch(e => {});
});

composer.callbackQuery('startSettings', ctx => { 
    replySettings(ctx);
});

composer.callbackQuery('startHelp', ctx => { 
    replyHelp(ctx);
});
export default composer;