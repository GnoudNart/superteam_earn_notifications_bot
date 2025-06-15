import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot';
import { replyEditSettings, replySettings } from './settings';

const composer = new Composer<MyContext>();

export const editReplyBountyType = (ctx: MyContext) => {
    const isBounties = ctx.session.isBounties;
    const isProjects = ctx.session.isProjects;
    const setBountyTypeInlineKeyboard = new InlineKeyboard()
    .text((isBounties?"✅":"☑️") + " Bounties","setBountyTypeBounties")
    .text((isProjects?"✅":"☑️") + " Projects","setBountyTypeProjects")
    .row()
    .text("⚙️ Back to settings","setBountyTypeBack");
    let currentType = (isBounties?"Bounties":"") + (isBounties && isProjects?" + ":"") + (isProjects?"Projects":"")
    let messageText = "Set your bounties type: " + currentType;
    const spaceLine = `\n${" ".repeat(100)}&#x200D;\n`;
    messageText = messageText + spaceLine;
    
    try {
        ctx.editMessageText(messageText,{
            parse_mode: "HTML",
            reply_markup: setBountyTypeInlineKeyboard,
        }).catch(e => {
            console.log(e.description);
            ctx.answerCallbackQuery(e.description).catch(e => console.log(e));
        });
    } catch (err) {
        console.error("Some thing happend", err);
        replySettings(ctx);
    }
}

const updateAndReplyBountyType = async (ctx: MyContext, bountyType: string) => {
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
    editReplyBountyType(ctx);
}

// register callback_query
composer.callbackQuery('setBountyTypeBack', ctx => { 
    replyEditSettings(ctx);
});

composer.on("callback_query:data").filter((ctx) => {
    return ctx.callbackQuery.data.startsWith("setBountyType")
}, (ctx) => {
    let data = ctx.callbackQuery.data;
    let bountyType = data.substring("setBountyType".length,data.length);
    updateAndReplyBountyType(ctx,bountyType);
    return;
});

export default composer;