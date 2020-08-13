import { get } from './storage.js';
//import language from './languages/index.js';
import * as ipinfo from './api/ipinfo.js';
import * as openweathermap from './api/openweathermap.js';

import * as location from './modules/location.js';
import * as weather from './modules/weather.js';

const lang = get('lang', '"en"');
const degrees = get('degrees', '"C"');

async function f() {

  try {
    let d = await ipinfo.getIPInfo();;
    console.log(d);
    let weatherInfo = await openweathermap.getWeatherInfo(d.city, lang)
    console.log(weatherInfo);
    location.updateLocation(weatherInfo);
    weather.updateWeather(weatherInfo, lang, degrees);
  } catch (err) {
    // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    console.log(err);
  }
}

f();


