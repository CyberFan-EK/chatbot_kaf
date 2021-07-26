const wordsProgramsKafedra = [
  'Спеціальності',
  '🧠 Спеціальності',
  'Специальности',
  /[Сс]пец/g,
  'Программы',
  'Освітня программа',
  'Програми',
  'Напрямки',
  /[Нн]апр/g,
  'Направления',
];
const wordsAbiturient = [
  '👩‍💻 Абітурієнт',
  'Абитуриент',
  /[Аа]біт/g,
  /[Аа]бит/g,
  /[Шш]кол/g,
  /[Шш]кіл/g,
];
const wordInformEconom = [
  'Інформаціна економіка',
  /[Іі]нформац/g,
  /[Ии]нформац/g,
  /[Ее]коно/g,
  'ЕК',
  'Ек',
  'ек',
  'эк',
  'Эк',
  'ЭК',
  /[Кк]ибер/g,
  /[Кк]ібер/g,
];

const wordFinance = [
  'Фінанси, банківська справа та страхування',
  /[Фф]іна/g,
  /[Фф]ина/g,
  /[Бб]анк/g,
  /[Сс]трах/g,
  /[Фф]бс/g,
];

const wordEP = [
  'Підприємництво, торгівля та біржова діяльність',
  /[Пп]ідпр/g,
  /[Пп]редпр/g,
  /[Бб]ирж/g,
  /[Бб]ірж/g,
  /[Пп]тб/g,
];

const wordDwaD = [
  /[Пп]рог/g,
  /[Пп]ол/g,
  /[Дд]ва/g,
  /[Дд]ипло/g,
  /[Ее]вро/g,
  /[Єє]вро/g,
  'Програма «Подвійного диплома»',
  /2[Dd]/g,
  /2[Дд]/g,
];

const wordTeachers = [/[Пп]реп/g, '👨‍🏫 Викладачі', '⬅️ Викладачі'];

const wordsZNO = ['😪🅱️✔ Необхідні ЗНО', /[Зз]но/g];
const wordStudent = ['📈 Студент', /[Сс]туд/g, /[Уу]чеб/g];

const wordActivity = ['Активності', /[Аа]ктив/g, '😁🏅 Активності'];

const wordGrafic = ['Графік навчання', /[Гг]раф/g];
const wordTimeTable = ['Розклад', /[Рр]озкл/g, /[Рр]аспи/g, /[Hh]jprk/g, /[Hh]fcgbc/g];

const wordsStartMenu = ['⬅️ Головне меню', /[Мм]еню/g, /[Сс]тарт/g, /[M]enu/g, /[Ss]tart/g];

const wordNews = ['Дайджест', 'Новини', /[Нн]овост/g, /[Нн]овини/g, 'News', 'New'];
const wordZavKaf = ['Завідувач кафедри', /[Зз]ав/g, /[Гл]лущ/g, /[Кк]афе/g];
const wordTeacher = ['Викладачі (співробітники)', /[Сс]пів/g, /[Сс]отру/g];
const wordQuestionnaire = ['📑 Залишити анкету', 'заява', 'анкета', /[Аа]нке/g, /[Зз]аяв/g];

module.exports.wordsProgramsKafedra = wordsProgramsKafedra;
module.exports.wordsAbiturient = wordsAbiturient;
module.exports.wordInformEconom = wordInformEconom;
module.exports.wordFinance = wordFinance;
module.exports.wordEP = wordEP;
module.exports.wordDwaD = wordDwaD;
module.exports.wordStudent = wordStudent;
module.exports.wordGrafic = wordGrafic;
module.exports.wordTimeTable = wordTimeTable;
module.exports.wordActivity = wordActivity;
module.exports.wordsStartMenu = wordsStartMenu;
module.exports.wordNews = wordNews;
module.exports.wordsZNO = wordsZNO;
module.exports.wordTeachers = wordTeachers;
module.exports.wordZavKaf = wordZavKaf;
module.exports.wordTeacher = wordTeacher;
module.exports.wordQuestionnaire = wordQuestionnaire;
