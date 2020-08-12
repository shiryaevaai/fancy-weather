import { get } from './storage.js';
//import language from './languages/index.js';
import * as ipinfo from './api/ipinfo.js';
import * as openweathermap from './api/openweathermap.js';


const lang = get('lang', '"en"');

async function f() {

  try {
    let d = await ipinfo.getIPInfo();;
    console.log(d);
    let weather = await openweathermap.getWeatherInfo(d.city, lang)
    console.log(weather);
  } catch (err) {
    // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    console.log(err);
  }
}

f();


