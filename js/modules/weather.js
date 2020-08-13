import { convertFromCelciusToFahrenheit } from '../utils/degreeConverter.js';

export function updateWeather(data, lang = 'en', degree = 'C') {

  let temperature = data.list[0].main.temp.toString().split('.')[0];

  if (degree == 'F') {
    temperature = convertFromCelciusToFahrenheit(temperature);
  }

  let currentTemperature = document.getElementsByClassName('js-current-temperature')[0];
  currentTemperature.innerText = temperature > 0 ? '+' + temperature : temperature;

  let currentWeatherIcon = getWeatherIcon(data.list[0].weather.icon);
  let img = document.getElementsByClassName('js-current-overcast')[0];
  img.src = currentWeatherIcon;
  //let latArray = data.city.coord.lat.toString().split('.');
  //let lonArray = data.city.coord.lon.toString().split('.');

  //let latitude = document.getElementsByClassName('js-location-latitude')[0];
  //latitude.innerText = latArray[0] + '\xB0' + latArray[1].substr(0, 2) + '\'';

  //let longitude = document.getElementsByClassName('js-location-longitude')[0];
  //longitude.innerText = lonArray[0] + '\xB0' + lonArray[1].substr(0, 2) + '\'';
}


//{ cod: "200", message: 0, cnt: 40, list: Array(40), city: { … } }
//  city: { id: 524901, name: "Moscow", coord: { … }, country: "RU", population: 1000000, … }
//  cnt: 40
//  cod: "200"
//  list: Array(40)
//    0:
//    clouds: { all: 70 }
//    dt: 1597233600
//    dt_txt: "2020-08-12 12:00:00"
//    main:
//      feels_like: 14.86
//      grnd_level: 996
//      humidity: 58
//      pressure: 1012
//      sea_level: 1012
//      temp: 17.68
//      temp_kf: -1.76
//      temp_max: 19.44
//      temp_min: 17.68
//      __proto__: Object
//    pop: 0.7
//    rain: { 3h: 0.29 }
//    sys: { pod: "d" }
//    visibility: 10000
//    weather: Array(1)
//      0:
//      description: "light rain"
//      icon: "10d"
//      id: 500
//      main: "Rain"
//      __proto__: Object
//    length: 1
//    __proto__: Array(0)
//    wind:
//      deg: 333
//      speed: 3.83

function getWeatherIcon(iconCode) {
  let icon = '';
  let path = 'assets/icons/';
  switch (iconCode) {
    case '10d'://light rain
      icon = 'rain.svg';
      break;
    case '04d'://overcast clouds
      icon = 'cloudy.svg';
      break;
    case '04n'://broken clouds
      icon = 'cloudy.svg';
      break;
    case '02d'://few clouds
      icon = 'cloudy.svg';
      break;
    case '03d'://scattered clouds
      icon = 'cloudy.svg';
      break;
    case '01d'://clear sky
      icon = 'clear-day.svg';
      break;
    case '13d'://light snow
      icon = 'snow.svg';
      break;
    //case '10d'://light rain
    //  icon = 'rain.svg';
    //  break;
    //case '10d'://light rain
    //  icon = 'rain.svg';
    //  break;
    default:
      icon = 'clear-day.svg';
      break;
  }

  return path + icon;
}