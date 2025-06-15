import { Composer, GrammyError, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot';
import { replyStart } from './start';
import { editReplyBountyType } from './bounty';
import { editReplySkills } from './skills';

const composer = new Composer<MyContext>();

const getSettingMessage = (ctx: MyContext) => {
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
    .text("💵 Set USD Range","settingsUSDValue")
    .row()
    .text("💰 Set Bounty Type","settingsBountyType")
    .row()
    .text("🎯 Set Skill Set","settingsSkills")
    .row()
    .text(notiText,"settingsNoti")
    .row()
    .text("🏘 Back to main page","settingsBack");
    return {
        message:message,
        settingsInlineKeyboard: settingsInlineKeyboard
    };
}

export const replyEditSettings = (ctx: MyContext) => {
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

export const replySettings = (ctx: MyContext) => {
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

// register command
composer.command('settings', (ctx) => {
    replySettings(ctx);
});

// register callback_query
composer.callbackQuery('settingsBack', ctx => { 
    replyStart(ctx);
});

composer.callbackQuery('settingsBountyType', ctx => { 
    editReplyBountyType(ctx);
});

composer.callbackQuery('settingsSkills', ctx => { 
    editReplySkills(ctx);
});

composer.callbackQuery('settingsNoti', async ctx => { 
    ctx.session.isEnableNoti = !ctx.session.isEnableNoti;
    await ctx.answerCallbackQuery(`Notifications has been set to: ${ctx.session.isEnableNoti?"On":"Off"}`);
    replyEditSettings(ctx);
});

export default composer;