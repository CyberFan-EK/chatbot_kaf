const words = require('../../word');
const sendQuestion = require('./sendQuestion');
let nameUser, phoneUser, questionUser;
const {
  Telegraf,
  Markup,
  Scenes: { BaseScene, Stage },
  session,
} = require('telegraf');

const buttonsNext = Markup.keyboard([
  ['👩‍💻 Абітурієнт'],
  ['📈 Студент'],
  ['👨‍🏫 Викладачі'],
  ['📑 Залишити анкету'],
])
  .oneTime()
  .resize();

function getStartMenu(ctx) {
  ctx.reply(
    `Якщо ти абітурієнт і у тебе є запитання щодо вступу чи навчання на нашій кафедрі, то тисни "Абітурієнт".
  
  Якщо ти студент і хочеш дізнатися інформацію щодо навчального процесу, то тисни "Студент".
  
  Якщо ти викладач і хочеш бути в курсі подій, то тисни  "Викладач".  
  
  А якщо у тебе є інші запитання чи пропозиції, то тисни на "Залишити анкету" тут чи у головному меню і пиши запитання - ми прочитаємо та відповімо як тільки матимемо змогу.
    
  Щоб відписатись від бота, у будь-який момент пиши слово "stop".`,
    buttonsNext
  );
}

module.exports = (bot) => {
  const exit_keyboard = Markup.keyboard(['⬅️ Вихід']).oneTime().resize();

  const nameScene = new BaseScene('nameScene');
  nameScene.enter(async (ctx) => {
    await ctx.reply(
      `Якщо у Вас залишилися запитання Ви можете залишити свої контакти з питанням в цій анкеті і наші викладачі з Вами зв'яжуться`
    );
    await ctx.reply(`Введіть Ваші особисті дані (Прізвище, ім'я абітурієнта): `, exit_keyboard);
  });
  nameScene.on('text', async (ctx) => {
    if (ctx.message.text && ctx.message.text !== '⬅️ Вихід') {
      nameUser = ctx.message.text;
      await ctx.reply(`Дякуємо ${nameUser} ми зберегли в анкеті Ваше імя`);
      return await ctx.scene.enter('phoneScene');
    }

    getStartMenu(ctx);
    return ctx.scene.leave();
  });

  const phoneScene = new BaseScene('phoneScene');
  phoneScene.enter((ctx) => {
    const buttonSendNumber = {
      reply_markup: {
        keyboard: [
          [{ text: '📲 Відправити номер телефону', request_contact: true }],
          [{ text: '⬅️ Вихід' }],
        ],
        resize_keyboard: true,
      },
    };
    ctx.reply('Відправьте Ваш номер телефону', buttonSendNumber);
  });
  phoneScene.on('message', async (ctx) => {
    if (ctx.message?.contact?.phone_number && ctx.message.text !== '⬅️ Вихід') {
      phoneUser = ctx.message.contact.phone_number;
      return await ctx.scene.enter('questionScene');
    } else if (ctx.message.text && ctx.message.text !== '⬅️ Вихід') {
      await ctx.reply(
        `Для відправки номера треба натиснути на кнопку "📲 Відправити номер телефону" `,
        exit_keyboard
      );
      await ctx.scene.enter('phoneScene');
    }

    return await ctx.scene.leave();
  });
  const questionScene = new BaseScene('questionScene');
  questionScene.enter(async (ctx) => {
    await ctx.reply(`Залиште Ваше запитання:`, exit_keyboard);
  });
  questionScene.on('text', async (ctx) => {
    if (ctx.message.text) {
      questionUser = ctx.message.text;
      await ctx.reply(
        'Дякуємо за ваш запит, через деякий час Вам нададуть відповідь або зателефонують.',
        buttonsNext
      );

      sendQuestion(nameUser, phoneUser, questionUser);
    }

    return await ctx.scene.leave();
  });

  const stage = new Stage([nameScene, phoneScene, questionScene]);

  bot.use(session());
  bot.use(stage.middleware());
  bot.hears(words.wordQuestionnaire, (ctx) => ctx.scene.enter('nameScene'));
  stage.hears('⬅️ Вихід', (ctx) => {
    ctx.scene.leave();
    getStartMenu(ctx);
  });
};
