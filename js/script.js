import * as storage from './storage.js';
import dictionaries from './dictionaries/index.js';
import * as ipinfo from './api/ipinfo.js';
import * as openweathermap from './api/openweathermap.js';
import * as unsplash from './api/unsplash.js';
import * as opencagedata from './api/opencagedata.js';

import * as location from './modules/location.js';
import * as weather from './modules/weather.js';
import * as navigation from './modules/navigation.js';
import * as language from './modules/language.js';

var lang = storage.get('lang', '"en"');
var degrees = storage.get('degrees', '"C"');

var updateBackgroundButton;
var switchLanguageButton;
var switchToFButton;
var switchToCButton;
var searchButton;

async function main() {

  try {
    navigation.updateBackground();

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
    let weatherInfo = await openweathermap.getWeatherInfoByCityName(ipInfo.city, lang)
    console.log(weatherInfo);

    updatePageData(weatherInfo, lang);

    //if (degrees == '"C"') {
    //  switchToCButton.classList.add("btn-selected");
    //}
    //else {
    //  switchToFButton.classList.add("btn-selected");
    //}

    document.getElementById("switch-language-items").onclick = function (event) {
      let newLang = '';

      if (event.target.matches('#en-item')) {
        newLang = 'en';
        switchLanguageButton.innerText = 'EN';
      }
      if (event.target.matches('#ru-item')) {
        newLang = 'ru';
        switchLanguageButton.innerText = 'RU';
      }
      if (event.target.matches('#be-item')) {
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

async function updatePageData(weatherInfo, lang = 'en', isPageOverload = true) {

  if (!isPageOverload) {
    navigation.updateBackground();
  }

  language.updateLabels(lang);

  location.updateLocation(weatherInfo.city);
  weather.updateWeatherDetailed(weatherInfo.list[0], lang, degrees);

  var today = new Date();
  let dayOfWeek = today.getDay();

  for (var i = 1; i <= 3; i++) {
    let dayOfWeekNext = dayOfWeek + i;
    if (dayOfWeekNext > 6) {
      dayOfWeekNext -= 7;
    }

    weather.updateWeatherShort(weatherInfo.list[i], i, lang, degrees);
    language.updateDayOfWeek(dayOfWeekNext, i, lang);
  }
}

async function search(lang) {
  let searchInput = document.getElementsByClassName('js-search-input')[0];
  let query = searchInput.value;
  let response = await opencagedata.findLocation(query);

  if (response.total_results == 0) {
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

    storage.set('location', locationName);
    let weatherInfo = await openweathermap.getWeatherInfoByCityName(locationName, lang);

    //let weatherInfo = await openweathermap.getWeatherInfoByCoords(location.geometry.lat, location.geometry.lng, lang);
    updatePageData(weatherInfo, lang, false);
  }
}

async function switchLanguage(newLang) {
  storage.set('lang', newLang);
  lang = newLang;
  let locationName = storage.get('location', 'Moscow');
  let weatherInfo = await openweathermap.getWeatherInfoByCityName(locationName, lang);
  updatePageData(weatherInfo, lang, false);
}

main();


