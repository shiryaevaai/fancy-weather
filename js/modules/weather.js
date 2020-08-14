import { convertFromCelciusToFahrenheit } from '../utils/degreeConverter.js';

export function updateWeatherDetailed(data, lang = 'en', degree = 'C') {

  let temperature = data.main.temp.toString().split('.')[0];

  if (degree == 'F') {
    temperature = convertFromCelciusToFahrenheit(temperature);
  }

  let currentTemperature = document.getElementsByClassName('js-current-temperature')[0];
  currentTemperature.innerText = temperature > 0 ? '+' + temperature : temperature;

  let currentWeatherIcon = getWeatherIcon(data.weather[0].icon);
  let img = document.getElementsByClassName('js-current-overcast')[0];
  img.src = currentWeatherIcon;

  let clouds = data.weather[0].description.toUpperCase();
  let cloudsItem = document.getElementsByClassName('js-clouds')[0];
  cloudsItem.innerText = clouds;

  let feelsLike = data.main.feels_like.toString().split('.')[0];
  if (parseInt(feelsLike) > 0) {
    feelsLike = '+' + feelsLike;
  }
  let feelsLikeItem = document.getElementsByClassName('js-feels-like')[0];
  feelsLikeItem.innerText = feelsLike;

  let humidity = data.main.humidity;
  let humidityItem = document.getElementsByClassName('js-humidity')[0];
  humidityItem.innerText = humidity;

  let wind = data.wind.speed.toString().split('.')[0];
  let windItem = document.getElementsByClassName('js-wind')[0];
  windItem.innerText = wind;
}

export function updateWeatherShort(data, index, lang = 'en', degree = 'C') {
  //js-short-info__header3
  //js-short-info__temperature3
  //js-short-info__icon3
  let temperature = data.main.temp.toString().split('.')[0];

  if (degree == 'F') {
    temperature = convertFromCelciusToFahrenheit(temperature);
  }

  let currentTemperature = document.getElementsByClassName('js-short-info__temperature'+index)[0];
  currentTemperature.innerText = temperature > 0 ? '+' + temperature : temperature;

  let currentWeatherIcon = getWeatherIcon(data.weather[0].icon);
  let img = document.getElementsByClassName('js-short-info__icon'+index)[0];
  img.src = currentWeatherIcon;
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