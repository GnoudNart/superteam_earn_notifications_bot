import { Composer, InlineKeyboard } from 'grammy';
import { MyContext } from '../bot';
import { allAvailableSkills } from '../interface/skills';
import { replyEditSettings } from './settings';

const composer = new Composer<MyContext>();

const updateSkill = async (ctx: MyContext, skill: string) => {
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
    }
}

export const editReplySkills = (ctx: MyContext) => {
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
    .text("⚙️ Back to settings","skillsBack");
    ctx.editMessageText(messageString,{
        parse_mode: "HTML",
        reply_markup: skillsInlineKeyboard,
    });
}

// register callback_query
composer.callbackQuery('skillsBack', ctx => {
    replyEditSettings(ctx);
});

composer.on("callback_query:data").filter((ctx) => {
    return ctx.callbackQuery.data.startsWith("skills")
}, (ctx) => {
    let data = ctx.callbackQuery.data;
    let skill = data.substring("skills".length,data.length);
    updateSkill(ctx,skill);
    editReplySkills(ctx);
});

export default composer;