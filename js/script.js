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
var switchToFButton;
var switchToCButton;
var searchButton;

async function main() {

  try {
    navigation.updateBackground();

    let ipInfo = await ipinfo.getIPInfo();
    console.log(ipInfo);
    let weatherInfo = await openweathermap.getWeatherInfoByCityName(ipInfo.city, lang)
    console.log(weatherInfo);

    updatePageData(weatherInfo);

    updateBackgroundButton = document.getElementById("update-background-button");
    updateBackgroundButton.onclick = navigation.updateBackground;

    switchToFButton = document.getElementById("switch-to-f");
    switchToCButton = document.getElementById("switch-to-c");
    searchButton = document.getElementById("search-button");

    //if (degrees == '"C"') {
    //  switchToCButton.classList.add("btn-selected");
    //}
    //else {
    //  switchToFButton.classList.add("btn-selected");
    //}

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

async function updatePageData(weatherInfo, isPageOverload = true) {

  if (!isPageOverload) {
    navigation.updateBackground();
  }

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
    if (location.components._type == 'city') {
      locationName = location.components.city;
    }
    else {
      //ToDo
    }

    let weatherInfo = await openweathermap.getWeatherInfoByCityName(locationName, lang);

    //let weatherInfo = await openweathermap.getWeatherInfoByCoords(location.geometry.lat, location.geometry.lng, lang);
    updatePageData(weatherInfo, false);
  }
}

main();


