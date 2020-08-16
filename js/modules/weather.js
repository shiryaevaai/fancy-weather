import { convertFromCelciusToFahrenheit } from '../utils/degreeConverter.js';

export function updateWeatherDetailed(data, lang = 'en', degree = 'C') {

  let temperature = Math.trunc(data.main.temp);

  if (degree == '"F"') {
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

  let feelsLike = Math.trunc(data.main.feels_like);
  if (degree == '"F"') {
    feelsLike = convertFromCelciusToFahrenheit(feelsLike);
  }
  if (parseInt(feelsLike) > 0) {
    feelsLike = '+' + feelsLike;
  }
  let feelsLikeItem = document.getElementsByClassName('js-feels-like')[0];
  feelsLikeItem.innerText = feelsLike;

  let humidity = data.main.humidity;
  let humidityItem = document.getElementsByClassName('js-humidity')[0];
  humidityItem.innerText = humidity;

  let wind = Math.trunc(data.wind.speed);
  let windItem = document.getElementsByClassName('js-wind')[0];
  windItem.innerText = wind;
}

export function updateWeatherShort(data, index, lang = 'en', degree = 'C') {
  let temperature = Math.trunc(data.main.temp);

  if (degree == '"F"') {
    temperature = convertFromCelciusToFahrenheit(temperature);
  }

  let currentTemperature = document.getElementsByClassName('js-short-info__temperature'+index)[0];
  currentTemperature.innerText = temperature > 0 ? '+' + temperature : temperature;

  let currentWeatherIcon = getWeatherIcon(data.weather[0].icon);
  let img = document.getElementsByClassName('js-short-info__icon'+index)[0];
  img.src = currentWeatherIcon;
}

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
    default:
      icon = 'clear-day.svg';
      break;
  }

  return path + icon;
}