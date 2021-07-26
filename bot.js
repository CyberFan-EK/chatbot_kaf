// For hide token in file .env
require('dotenv').config();

const { Telegraf, Markup, Extra, Stage, session } = require('telegraf');
const token = process.env.BOT_TOKEN;
const fs = require('fs');
const filePath = 'messages/message.txt';

// For keep all id users
const chatIdUsers = [];

if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token);

const startBot = require('./src/commands/start');
startBot(bot);

// const SceneGenerator = require('./src/scene/scenes');
// const curScene = new SceneGenerator();
// const ageScene = curScene.GenAgeScene();
// const nameScene = curScene.GennameScene();
// const stage = new Stage(ageScene, nameScene);
// bot.use(session());
// bot.use(stage.middleware());

// bot.command('echo', async (ctx) => {
//   ctx.scene.enter('age');
// });

/* eslint-disable @typescript-eslint/no-floating-promises */

// Прослушка веток Для абитуриентов
const enrolletBranch = require('./src/enrolle/start');
enrolletBranch(bot);

// Прослушка веток Для студентов

const studentBranch = require('./src/students/start');
studentBranch(bot);

// Прослушка веток Для преподователей
const teacherBranch = require('./src/teacher/start');
teacherBranch(bot);

// сцена
const questionScena = require('./src/scene/scenes');
questionScena(bot);

// рассылка новостей через обновление файла messages/message.txt
fs.watchFile(filePath, function () {
  const file = fs.readFileSync(filePath);
  chatIdUsers.forEach((id) => bot.telegram.sendMessage(id, file.toString('utf-8')));

  // Send message to chat or group with the file content here

  // console.log('File content at: ' + new Date() + ' is: \n' + fs.readFileSync(filePath));
  // console.log('File content at: ' + new Date() + ' is: \n' + data);
  // bot.telegram
  //   .sendMessage('File content at: ' + new Date() + ' is: \n' + fs.readFileSync(filePath))

  //   .then((msg_info) => {
  //     // доставлено
  //   })
  //   .catch((error) => {
  //     console.log('Error:', error.message);
  //     // console.log('Error:', error)
  //   });
  // ctx.telegram.sendMessage(
  //   ctx.message.chat.id,
  //   'File content at: ' + new Date() + ' is: \n' + file
  // );
});

// // under conctruction ))
// bot.command('custom', async (ctx) => {
//   return await ctx.reply(
//     'Custom buttons keyboard',
//     Markup.keyboard([
//       ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
//       ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
//       ['📢 Ads', '⭐️ Rate us', '👥 Share'], // Row3 with 3 buttons
//     ])
//       .oneTime()
//       .resize()
//   );
// });

// bot.command('onetime', (ctx) =>
//   ctx.reply(
//     'One time keyboard',
//     Markup.keyboard(['/simple', '/inline', '/pyramid']).oneTime().resize()
//   )
// );

// bot.command('special', (ctx) => {
//   return ctx.reply(
//     'Special buttons keyboard',
//     Markup.keyboard([
//       Markup.button.contactRequest('Send contact'),
//       Markup.button.locationRequest('Send location'),
//     ]).resize()
//   );
// });

// bot.command('pyramid', (ctx) => {
//   return ctx.reply(
//     'Keyboard wrap',
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2,
//     })
//   );
// });

// bot.command('simple', (ctx) => {
//   return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Markup.keyboard(['Coke', 'Pepsi']));
// });

// bot.command('random', (ctx) => {
//   return ctx.reply(
//     'random example',
//     Markup.inlineKeyboard([
//       Markup.button.callback('Coke', 'Coke'),
//       Markup.button.callback('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
//       Markup.button.callback('Pepsi', 'Pepsi'),
//     ])
//   );
// });

// bot.command('caption', (ctx) => {
//   return ctx.replyWithPhoto(
//     { url: 'https://picsum.photos/200/300/?random' },
//     {
//       caption: 'Caption',
//       parse_mode: 'Markdown',
//       ...Markup.inlineKeyboard([
//         Markup.button.callback('Plain', 'plain'),
//         Markup.button.callback('Italic', 'italic'),
//       ]),
//     }
//   );
// });

// bot.hears(/\/wrap (\d+)/, (ctx) => {
//   return ctx.reply(
//     'Keyboard wrap',
//     Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
//       columns: parseInt(ctx.match[1]),
//     })
//   );
// });

// bot.action('Dr Pepper', (ctx, next) => {
//   return ctx.reply('👍').then(() => next());
// });

// bot.action('plain', async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.editMessageCaption(
//     'Caption',
//     Markup.inlineKeyboard([
//       Markup.button.callback('Plain', 'plain'),
//       Markup.button.callback('Italic', 'italic'),
//     ])
//   );
// });

// bot.action('italic', async (ctx) => {
//   await ctx.answerCbQuery();
//   await ctx.editMessageCaption('_Caption_', {
//     parse_mode: 'Markdown',
//     ...Markup.inlineKeyboard([
//       Markup.button.callback('Plain', 'plain'),
//       Markup.button.callback('* Italic *', 'italic'),
//     ]),
//   });
// });

// bot.action(/.+/, (ctx) => {
//   return ctx.answerCbQuery(`Вау, ${ctx.match[0]}! Гарний вибір`);
// });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
