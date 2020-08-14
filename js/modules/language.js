import dictionaries from '../dictionaries/index.js';

export function updateDayOfWeek(dayOfWeekNumber, index, lang = 'en') {
  let title = getDayOfWeekName(dayOfWeekNumber, lang) ;
  let header = document.getElementsByClassName('js-short-info__header' + index)[0];
  header.innerText = title;
}

function getDayOfWeekName(dayOfWeekNumber, lang = 'en') {
  let day = '';
  let dictionary = dictionaries[lang];

  switch (dayOfWeekNumber) {
    case 0:
      day = dictionary.sun;
      break;
    case 1:
      day = dictionary.mon;
      break;
    case 2:
      day = dictionary.tue;
      break;
    case 3:
      day = dictionary.wed;
      break;
    case 4:
      day = dictionary.thu;
      break;
    case 5:
      day = dictionary.fri;
      break;
    case 6:
      day = dictionary.sat;
      break;
    default:
      day = dictionary.sun;
      break;
  }

  return day;
}