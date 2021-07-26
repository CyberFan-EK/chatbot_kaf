const words = require('../../word');
const { Markup } = require('telegraf');

module.exports = (bot) => {
  bot.start((ctx) => {
    if (!chatIdUsers.includes(ctx.chat.id)) chatIdUsers.push(ctx.chat.id);
    const buttonsStart = {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([Markup.button.callback('Почати', 'Почати')]),
    };
    ctx.reply(
      `Привіт, ${ctx.message.from.first_name}!👋 Я ФінТЕКашнік - чат-бот кафедри Інформаційної економіки, підприємництва та фінансів і я готовий поспілкуватися з тобою) Тисни "Почати" та починай спілкуватись`,
      buttonsStart
    );
  });

  const helpMessage = `
  Перелік знайомих команд
  /start - стартувати бота
  /help - команди, які я знаю
  /location - де ми знаходимось 
  
  `;
  bot.help((ctx) => {
    ctx.reply(helpMessage);
  });

  bot.command('location', (ctx) => {
    bot.telegram.sendLocation(ctx.chat.id, 47.8606, 35.102017);
    ctx.reply(`Адреса: 69006, м. Запоріжжя, просп. Соборний, 226`);
  });

  bot.hears(words.wordsStartMenu, getStartMenu);

  function getStartMenu(ctx) {
    const buttonsNext = Markup.keyboard([
      ['👩‍💻 Абітурієнт'],
      ['📈 Студент'],
      ['👨‍🏫 Викладачі'],
      ['📑 Залишити анкету'],
    ])
      .oneTime()
      .resize();

    ctx.reply(
      `Якщо ти абітурієнт і у тебе є запитання щодо вступу чи навчання на нашій кафедрі, то тисни "Абітурієнт".
    
    Якщо ти студент і хочеш дізнатися інформацію щодо навчального процесу, то тисни "Студент".
    
    Якщо ти викладач і хочеш бути в курсі подій, то тисни  "Викладач".  
    
    А якщо у тебе є інші запитання чи пропозиції, то тисни на "Написати модератору" тут чи у головному меню і пиши запитання - ми прочитаємо та відповімо як тільки матимемо змогу.
      
    Щоб відписатись від бота, у будь-який момент пиши слово "stop".`,
      buttonsNext
    );
  }
};
