import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot';
import { replySettings } from './settings';
import { replyHelp } from './help';

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

// register callback Query
composer.callbackQuery('startNewestCampaign', ctx => { 
    ctx.answerCallbackQuery("Comming Soon");
});

composer.callbackQuery('startCampaigns', ctx => { 
    ctx.answerCallbackQuery("Comming Soon");
});

composer.callbackQuery('startSavedCampaigns', ctx => { 
    ctx.answerCallbackQuery("Show user's saved campaigns, Comming Soon :D");
});

composer.callbackQuery('startSettings', ctx => { 
    replySettings(ctx);
});

composer.callbackQuery('startHelp', ctx => { 
    replyHelp(ctx);
});
export default composer;