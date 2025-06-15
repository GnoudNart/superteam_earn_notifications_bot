import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot';
import { replySettings } from './settings';
import { replyHelp } from './help';

const composer = new Composer<MyContext>();

export const replyStart = (ctx: MyContext) => {
    let userName = ctx.message?.from.username || "User";
    let welcome = "Welcome, 🎉🍾 @userName 🎊🍻\n👋 You’ve joined @superteam_earn_notifications_bot – your all-in-one Superteam Earn Notifications assistant!".replace("@userName", userName);
    if (!ctx.message?.from.username) {
        // join on command without message
        welcome = "🎉🍾Welcome back🎊🍻\n👋 You’ve joined @superteam_earn_notifications_bot – your all-in-one Superteam Earn Notifications assistant!".replace("@userName", userName);
    }
    let firstTimeMessage = "Looks like this is your first visit with us, please go to /settings to set up notifications that suit your needs ^_^";
    let content = "Some basic commands:\n/newest - Show some newest bounties campain\n/forme Show some bounties that fit your preference\n/settings - Setup your preference\n/help - Show help"
    let message = welcome + "\n\n" + (ctx.session.hasSet?"":firstTimeMessage + "\n\n") + content;
    const startInlineKeyboard = new InlineKeyboard()
    .text("🆕 Newest Campaigns","startNewestCampaign")
    .text("🎯 Campaigns for me","startCampaigns")
    .url("🌍 Earn Website","https://earn.superteam.fun/")
    .row()
    .text("🗄 My Saved Campaign","startSavedCampaigns")
    .row()
    .text("⚙️ Settings","startSettings").text("⁉️ Help","startHelp");

    ctx.reply(message, {
        reply_markup: startInlineKeyboard,
    });
}

// register command
composer.command('start', (ctx) => {
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
    ctx.answerCallbackQuery("Comming Soon");
});

composer.callbackQuery('startSettings', ctx => { 
    replySettings(ctx);
});

composer.callbackQuery('startHelp', ctx => { 
    replyHelp(ctx);
});
export default composer;