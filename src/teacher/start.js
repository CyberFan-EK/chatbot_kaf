const words = require('../../word');
const teachersBD = require('../../teacherBD');
const { Markup } = require('telegraf');
module.exports = (bot) => {
  bot.hears(words.wordTeachers, async (ctx) => {
    let name = '';
    let surname = '';
    if (ctx.from.first_name) name = ctx.from.first_name;
    if (ctx.from.last_name) surname = ctx.from.last_name;
    const buttonsTeach = Markup.keyboard([
      ['Завідувач кафедри'],
      ['Викладачі (співробітники)'],
      ['Розклад консультацій'],
      ['⬅️ Головне меню'],
    ])
      .oneTime()
      .resize();

    await ctx.reply(`Привіт, ${name} ${surname}!👋`);
    await ctx.reply(
      `Кафедру інформаційної економіки, підприємництва та фінансів створено у 2020 р. на базі трьох кафедр – економіки та інформаційних технологій; фінансів, банківської справи та страхування; економіки підприємства з метою подальшої модернізації освітніх програм у напряму Євроінтеграції та розвитку міжнародної діяльності`
    );
    await ctx.reply(
      `Сьогодні кафедра інформаційної економіки, підприємництва та фінансів – сучасний колектив висококваліфікованих фахівців, який об’єднує 2 доктори наук, 13 кандидатів наук, викладача – філолога, старшого лаборанта (викладача – філолога); залучає до освітнього процесу стейкхолдерів – професіоналів, докторів та кандидатів наук.`,
      buttonsTeach
    );
  });

  bot.hears(words.wordZavKaf, async (ctx) => {
    const buttonsBack = Markup.keyboard([['⬅️ Викладачі']])
      .oneTime()
      .resize();
    await ctx.reply(
      `Глущевський В'ячеслав Валентинович
  доктор економічних наук, професор`
    );
    await ctx.replyWithPhoto({ source: 'img/teacher/gluschevs.jpg' });
    await ctx.reply(
      `Адреса: 69006, м. Запоріжжя, просп. Соборний, 226 (10 корп., к. Л318)
  Tел.: (067) 921-30-70
  E-mail: gluschevsky@ukr.net`,
      buttonsBack
    );
  });

  bot.hears(words.wordTeacher, async (ctx) => {
    const buttonsBack = Markup.keyboard([['⬅️ Викладачі']])
      .oneTime()
      .resize();

    const buttonTeachArr = teachersBD.map((item, index, arr) => {
      return [{ text: item.name, callback_data: item.id }];
    });

    const buttonBDteacher = {
      reply_markup: {
        inline_keyboard: buttonTeachArr,
      },
    };

    await ctx.reply('Співробітники кафедри:', buttonBDteacher);

    await ctx.reply(`Адреса: 69006, м. Запоріжжя, просп. Соборний, 226`, buttonsBack);
  });

  teachersBD.forEach((teach) => {
    bot.action(teach.id, async (ctx) => {
      const buttonsBack = Markup.keyboard([['Викладачі (співробітники)'], ['⬅️ Меню']])
        .oneTime()
        .resize();

      const listSubjects = teach.subject.join(',\n ');

      await ctx.reply(
        `${teach.name} 
  ${teach.phd}`
      );
      await ctx.replyWithPhoto({ source: teach.foto });
      await ctx.reply(`Основні дисципліни:\n ${listSubjects}`);
      await ctx.reply(`Часи консультації: \n ${teach.konsult}`);
      await ctx.reply(`Біографія: \n ${teach.biograf}`, buttonsBack);
      await ctx.reply(`Наукові інтереси:\n ${teach.science}`, buttonsBack);
    });
  });
};
