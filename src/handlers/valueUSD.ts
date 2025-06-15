import { Composer, Context } from 'grammy';import {
  type Conversation,
  conversations,
  createConversation,
} from "@grammyjs/conversations";
import { MyContext } from '../bot';
import { replySettings } from './settings';

const composer = new Composer<MyContext>();
type MyConversationContext = Context;
type MyConversation = Conversation<MyContext, MyConversationContext>;

const cancelUSDValue = async (conversation: MyConversation, ctx: MyConversationContext) => {
    await ctx.reply("Operation cancelled.");
    await conversation.external((ctx) => {
        // check better experience here
        replySettings(ctx);
    });
    return;
}

// Conversation for setting min/max value
const setUSDValueConversation = async (conversation: MyConversation, ctx: MyConversationContext) => {
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
        // check better experience here
        replySettings(ctx);
    });    
}

// Register the conversation
composer.use(createConversation(setUSDValueConversation));

export const enterConversation = async (ctx: MyContext) => {
    await ctx.conversation.enter("setUSDValueConversation");
}
// Command to start the conversation
composer.command("setUSDValue", async (ctx) => {
    enterConversation(ctx);
});

composer.command("setMinValue", (ctx) => {
    if (Number(ctx.match) >= 0) {
        ctx.session.minValue = Number(ctx.match);
    }
});

composer.command("setMaxValue", (ctx) => {
    if (ctx.match === "*") {
        ctx.session.maxValue = Number(Infinity);
        return;
    }
    let value = Number(ctx.match);
    if (value >= ctx.session.minValue) {
        ctx.session.maxValue = value;
    }
});

composer.callbackQuery('settingsUSDValue', async ctx => { 
    await enterConversation(ctx);
});

export default composer;