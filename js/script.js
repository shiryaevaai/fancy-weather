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
    // ���������� ����� ������ � ����� try: � � fetch, � � response.json
    console.log(err);
  }
}

f();


