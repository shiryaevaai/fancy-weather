import dictionaries from '../dictionaries/index.js';

export function updateDate(today, lang = 'en') {
  let dayOfWeekNumber = today.getDay();
  let dayOfWeekShort = getDayOfWeekNameShort(dayOfWeekNumber, lang);

  let monthNumber = today.getMonth();
  let monthName = getMonthName(monthNumber, lang);

  let dateStr = dayOfWeekShort + ' ' + today.getDate() + ' ' + monthName;
   
  let dateElement = document.getElementsByClassName('js-date')[0];
  dateElement.innerText = dateStr;
}

export function updateTime(today) {
  let hours = today.getHours();
  let minutes = today.getMinutes();

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  let time = hours + ':' + minutes;

  let timeElement = document.getElementsByClassName('js-time')[0];
  timeElement.innerText = time;
}

export function updateDayOfWeek(dayOfWeekNumber, index, lang = 'en') {
  let title = getDayOfWeekName(dayOfWeekNumber, lang);
  let header = document.getElementsByClassName('js-short-info__header' + index)[0];
  header.innerText = title;
}

export function getDayOfWeekName(dayOfWeekNumber, lang = 'en') {
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

export function getDayOfWeekNameShort(dayOfWeekNumber, lang = 'en') {
  let day = '';
  let dictionary = dictionaries[lang];

  switch (dayOfWeekNumber) {
    case 0:
      day = dictionary.sunShort;
      break;
    case 1:
      day = dictionary.monShort;
      break;
    case 2:
      day = dictionary.tueShort;
      break;
    case 3:
      day = dictionary.wedShort;
      break;
    case 4:
      day = dictionary.thuShort;
      break;
    case 5:
      day = dictionary.friShort;
      break;
    case 6:
      day = dictionary.satShort;
      break;
    default:
      day = dictionary.sunShort;
      break;
  }

  return day;
}


function getMonthName(monthNumber, lang = 'en') {
  let month = '';
  let dictionary = dictionaries[lang];

  switch (monthNumber) {
    case 0:
      month = dictionary.jan;
      break;
    case 1:
      month = dictionary.feb;
      break;
    case 2:
      month = dictionary.mar;
      break;
    case 3:
      month = dictionary.apr;
      break;
    case 4:
      month = dictionary.may;
      break;
    case 5:
      month = dictionary.jun;
      break;
    case 6:
      month = dictionary.jul;
      break;
    case 7:
      month = dictionary.aug;
      break;
    case 8:
      month = dictionary.sep;
      break;
    case 9:
      month = dictionary.oct;
      break;
    case 10:
      month = dictionary.nov;
      break;
    case 11:
      month = dictionary.dec;
      break;
    default:
      month = dictionary.jan;
      break;
  }

  return month;
}