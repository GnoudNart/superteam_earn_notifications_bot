import { Composer } from 'grammy';
import { MyContext } from '../bot';

const composer = new Composer<MyContext>();

export const replyHelp = async (ctx: MyContext) => {
    ctx.reply("This bot notifies you about new bounties and projects on Superteam Earn.\nUse command /start to get started.\nUse command /settings to setup your preference.")
}
// register command
composer.command('help', (ctx) => {
    replyHelp(ctx)
});

export default composer;