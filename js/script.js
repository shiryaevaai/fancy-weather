import * as storage from './storage.js';
import dictionaries from './dictionaries/index.js';
import * as ipinfo from './api/ipinfo.js';
import * as openweathermap from './api/openweathermap.js';
import * as opencagedata from './api/opencagedata.js';

import * as language from './modules/language.js';
import * as location from './modules/location.js';
import * as weather from './modules/weather.js';
import * as navigation from './modules/navigation.js';
import * as date from './modules/date.js';

var lang = storage.get('lang', '"en"');
var degrees = storage.get('degrees', '"C"');

var updateBackgroundButton;
var switchLanguageButton;
var switchToFButton;
var switchToCButton;
var searchButton;

async function main() {

  try {
    await navigation.updateBackground();

    updateBackgroundButton = document.getElementById("update-background-button");
    updateBackgroundButton.onclick = navigation.updateBackground;

    switchLanguageButton = document.getElementById("switch-language");
    switchToFButton = document.getElementById("switch-to-f");
    switchToCButton = document.getElementById("switch-to-c");
    searchButton = document.getElementById("search-button");

    switch (lang) {
      case 'ru':
        switchLanguageButton.innerText = 'RU';
        break;
      case 'en':
        switchLanguageButton.innerText = 'EN';
        break;
      case 'be':
        switchLanguageButton.innerText = 'BE';
        break;
    }

    let ipInfo = await ipinfo.getIPInfo();
    console.log(ipInfo);
    storage.set('location', ipInfo.city);
    //let weatherInfo = await openweathermap.getWeatherInfoByCityName(ipInfo.city, lang)
    //console.log(weatherInfo);

    await search(lang, ipInfo.city);

    //if (degrees == '"C"') {
    //  switchToCButton.classList.add("btn-selected");
    //}
    //else {
    //  switchToFButton.classList.add("btn-selected");
    //}

    document.getElementById("switch-language-items").onclick = function (event) {
      let newLang = lang;
      let li = event.target.closest("li");

      if (li.matches('#en-item')) {
        newLang = 'en';
        switchLanguageButton.innerText = 'EN';
      }
      if (li.matches('#ru-item')) {
        newLang = 'ru';
        switchLanguageButton.innerText = 'RU';
      }
      if (li.matches('#be-item')) {
        newLang = 'be';
        switchLanguageButton.innerText = 'BE';
      }

      if (newLang !== lang) {
        switchLanguage(newLang);
      }
    };
    
    switchToFButton.onclick = function (event) {
      degrees = '"F"';
      //switchToFButton.classList.add("btn-selected");
      //switchToCButton.classList.remove("btn-selected");

      if (degrees != storage.get('degrees', '"C"')) {
        storage.set('degrees', degrees);
        navigation.updateDegrees();
      }
    };

    switchToCButton.onclick = function (event) {
      degrees = '"C"';
      //switchToCButton.classList.add("btn-selected");
      //switchToFButton.classList.remove("btn-selected");

      if (degrees != storage.get('degrees', '"C"')) {
        storage.set('degrees', degrees);
        navigation.updateDegrees();
      }
    };

    searchButton.onclick = function (event) {
      event.preventDefault();
      search(lang);
    };

  } catch (err) {
    console.log(err);
  }
}

async function updatePageData(name, country, weatherInfo, lang = 'en', isPageOverload = true) {

  if (!isPageOverload) {
    navigation.updateBackground();
  }

  language.updateLabels(lang);

  var today = new Date(new Date().getTime() + weatherInfo.city.timezone);
  location.updateLocation(name, country, weatherInfo.city);
  date.updateDate(today, lang);
  date.updateTime(today);

  weather.updateWeatherDetailed(weatherInfo.list[0], lang, degrees);

  let dayOfWeek = today.getDay();

  for (var i = 1; i <= 3; i++) {
    let dayOfWeekNext = dayOfWeek + i;
    if (dayOfWeekNext > 6) {
      dayOfWeekNext -= 7;
    }

    weather.updateWeatherShort(weatherInfo.list[i], i, lang, degrees);
    date.updateDayOfWeek(dayOfWeekNext, i, lang);
  }
}

async function search(lang, query = '') {
  let searchInput = document.getElementsByClassName('js-search-input')[0];
  if (query == '') {
    query = searchInput.value;
  }
 
  let response = await opencagedata.findLocation(query, lang);

  if (response.total_results == 0) {
    searchInput.value = '';
    searchInput.placeholder = dictionaries[lang].locationNotFound;
  }
  else {
    let location = response.results[0];

    let locationName = '';

    switch (location.components._type) {
      case 'city':
        locationName = location.components.city;
        break;
      case 'village':
        if (location.components.village != undefined) {
          locationName = location.components.village;
        }
        else if (location.components.village != hamlet) {
          locationName = location.components.hamlet;
        }
        
        break;
      case 'state':
        locationName = location.components.state;
        break;
      default:
        locationName = '';
    }

    storage.set('location', query);
    let weatherInfo = await openweathermap.getWeatherInfoByCityName(query, lang);

    await updatePageData(locationName, location.components.country, weatherInfo, lang, false);
  }
}

async function switchLanguage(newLang) {
  storage.set('lang', newLang);
  lang = newLang;
  let locationName = storage.get('location', 'Moscow');
  await search(lang, locationName);
  //let weatherInfo = await openweathermap.getWeatherInfoByCityName(locationName, lang);
  //updatePageData(weatherInfo, lang, false);
}

main();


