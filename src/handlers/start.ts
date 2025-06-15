import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot';
import { replySettings } from './settings';
import { replyHelp } from './help';
import { wrapperMarkdown } from '../utils';
import { NotificationData } from '../type';
import { getNewestCampaigns, getPreferenceNoti } from '../database';

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

const handleNewestCampaign = async (ctx: MyContext) => {
    if (!ctx.chatId)
        return;
    let newCampaigns = await getNewestCampaigns();
    console.log("Data: ", newCampaigns.length);
    sendNotifications(ctx,newCampaigns);
}

const handleForMe = async (ctx: MyContext) => {
    if (!ctx.chatId)
        return;
    let filterCampaigns = await getPreferenceNoti(ctx);
    console.log("Data: ", filterCampaigns.length);
    sendNotifications(ctx,filterCampaigns);
}

const sendNotifications = (ctx: MyContext, notificationsData: NotificationData[]) => {
    for (let notificationData of notificationsData) {
        sendNotification(ctx,notificationData)
    }
}

const sendNotification = (ctx: MyContext, notificationData: NotificationData) => {
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

    *🌟 Sponsor*: ${wrapperMarkdown(notificationData.sponsorName)}\\.
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
    handleNewestCampaign(ctx);
});

composer.command('forme', (ctx) => {
    handleForMe(ctx);
});

// register callback Query
composer.callbackQuery('startNewestCampaign', ctx => { 
    handleNewestCampaign(ctx);
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