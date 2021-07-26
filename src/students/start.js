const words = require('../../word');
const { Markup } = require('telegraf');

module.exports = (bot) => {
  bot.hears(words.wordStudent, async (ctx) => {
    let name = '';
    let surname = '';
    if (ctx.from.first_name) name = ctx.from.first_name;
    if (ctx.from.last_name) surname = ctx.from.last_name;
    const buttonsStudent = Markup.keyboard([
      ['Графік навчання'],
      ['Розклад'],
      ['Дайджест'],
      ['⬅️ Головне меню'],
    ])
      .oneTime()
      .resize();

    ctx.reply(`Привіт, студенте ${name} ${surname}!👋`);
    ctx.reply(`Що тебе цікавить?`);

    await ctx.replyWithPhoto(
      { source: 'img/ep.jpg' },

      buttonsStudent
    );
  });

  bot.hears(words.wordGrafic, async (ctx) => {
    const buttonsStudent = Markup.keyboard([
      ['Графік навчання'],
      ['Розклад'],
      ['Дайджест'],
      ['⬅️ Головне меню'],
    ])
      .oneTime()
      .resize();
    await ctx.replyWithPhoto({ source: 'img/online-learning-yes.jpg' });
    ctx.replyWithHTML(
      `Денна форма навчання:
  ✅ <a href="http://sites.znu.edu.ua/navchalnyj_viddil/grafik/Grafik_2020-2021_df.xls">Графік освітнього процесу 2020-2021 </a>
  
  Заочна форма навчання:
  ✅ <a href="http://sites.znu.edu.ua/navchalnyj_viddil/grafik/Grafik_2020-2021_zf.xls">Графік освітнього процесу 2020-2021 </a>
        `,
      buttonsStudent
    );
  });

  bot.hears(words.wordTimeTable, async (ctx) => {
    const buttonsStudent = Markup.keyboard([
      ['Графік навчання'],
      ['Розклад'],
      ['Дайджест'],
      ['⬅️ Головне меню'],
    ])
      .oneTime()
      .resize();
    await ctx.replyWithPhoto({ source: 'img/timetable.png' });
    ctx.replyWithHTML(
      `Денна форма:
  ✅ <a href="https://www.znu.edu.ua/2021/den/inni/s_-_1_kurs_denna.xlsx">1 курс</a>
  ✅ <a href="https://www.znu.edu.ua/2021/den/inni/s_-_2_kurs_denna.xlsx">2 курс </a>
  ✅ <a href="https://www.znu.edu.ua/2021/den/inni/_-_3_kurs__denna.xlsx">3 курс </a>
  ✅ <a href="https://www.znu.edu.ua/2021/den/inni/ls_-_4_kurs_denna.xlsx">4 курс </a>
  ✅ <a href="https://www.znu.edu.ua/2021/den/inni/_-_mag__str_1_kurs_denna.xlsx">Магістри 1 курс </a>
  Заочна форма:
  ✅ <a href="https://www.znu.edu.ua/2021/zao/inni/ls/1_kurs_bakalavr_zaochne.xlsx">1 курс</a>
  ✅ <a href="https://www.znu.edu.ua/2021/zao/inni/ls/2_kurs_bakalavr_zaochne_.xlsx">2 курс </a>
  ✅ <a href="https://www.znu.edu.ua/2021/zao/inni/ls/3_kurs_bakalavr_zaochne.xlsx">3 курс </a>
  ✅ <a href="https://www.znu.edu.ua/2021/zao/inni/ls/4_kurs_bakalavr_zaochne.xlsx">4 курс </a>    
  ✅ <a href="https://www.znu.edu.ua/2021/zao/inni/ls/5_kurs_bakalavr_zaochne.xlsx">5 курс </a>    
  ✅ <a href="https://www.znu.edu.ua/2021/zao/inni/ls/1_kurs_magistr_zaochne.xlsx">Магістри 1 курс </a>    
  `,
      buttonsStudent
    );
  });

  bot.hears(words.wordNews, async (ctx) => {
    const buttonsStudent = Markup.keyboard([
      ['Графік навчання'],
      ['Розклад'],
      ['Дайджест'],
      ['⬅️ Головне меню'],
    ])
      .oneTime()
      .resize();
    await ctx.replyWithPhoto({ source: 'img/student.jpg' });
    ctx.replyWithHTML(
      `
      Поки що немає активних подій 🙁
  
  Надходять канікули, тому бажаємо успішної сесії, студенте 😉    
  `,
      buttonsStudent
    );
  });
};
