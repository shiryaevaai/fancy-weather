import { get } from './storage.js';
//import language from './languages/index.js';
import * as ipinfo from './api/ipinfo.js';
import * as openweathermap from './api/openweathermap.js';
import * as unsplash from './api/unsplash.js';

import * as location from './modules/location.js';
import * as weather from './modules/weather.js';
import * as navigation from './modules/navigation.js';

const lang = get('lang', '"en"');
const degrees = get('degrees', '"C"');

var updateBackgroundButton;

async function f() {

  try {
    let img = await unsplash.getImage();
    console.log(img);
    document.getElementById("background").style.backgroundImage = "linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%), url('" + img.urls.full + "')";


    let d = await ipinfo.getIPInfo();
    console.log(d);
    let weatherInfo = await openweathermap.getWeatherInfo(d.city, lang)
    console.log(weatherInfo);
    location.updateLocation(weatherInfo);
    weather.updateWeatherDetailed(weatherInfo.list[0], lang, degrees);

    for (var i = 1; i <= 3; i++) {
      weather.updateWeatherShort(weatherInfo.list[i], i, lang, degrees);
    }

    updateBackgroundButton = document.getElementById("update-background-button");
    updateBackgroundButton.onclick = navigation.updateBackground;
  } catch (err) {
    // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    console.log(err);
  }
}

f();


