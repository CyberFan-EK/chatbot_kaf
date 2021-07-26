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

const bot = new Telegraf(token, { polling: true });

const startBot = require('./src/commands/start');
startBot(bot);

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

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
