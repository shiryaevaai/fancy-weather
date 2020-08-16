import * as unsplash from '../api/unsplash.js';
import { get } from '../storage.js';
import { set } from '../storage.js';
import * as degreeConverter from '../utils/degreeConverter.js';


export async function updateBackground() {
  try {
    let img = await unsplash.getImage();
    console.log(img);
    document.getElementsByTagName('body')[0].style.backgroundImage = "linear-gradient(rgba(8, 15, 26, 0.59) 100%, rgba(17, 17, 46, 0.46) 100%), url('" + img.urls.full + "')";

  } catch (err) {
    console.log(err);
  }
}

export function updateDegrees() {
  let degrees = get('degrees', '"C"');

  let currentTemperature = document.getElementsByClassName('js-current-temperature')[0];
  let temperature = degrees == '"C"' ?
    degreeConverter.convertFromFahrenheitToCelcius(currentTemperature.innerText):
    degreeConverter.convertFromCelciusToFahrenheit(currentTemperature.innerText);

  currentTemperature.innerText = temperature > 0 ? '+' + temperature : temperature;

  let feelsLikeItem = document.getElementsByClassName('js-feels-like')[0];
  temperature = degrees == '"C"' ?
    degreeConverter.convertFromFahrenheitToCelcius(feelsLikeItem.innerText) :
    degreeConverter.convertFromCelciusToFahrenheit(feelsLikeItem.innerText);

  feelsLikeItem.innerText = temperature > 0 ? '+' + temperature : temperature;

  for (var i = 1; i <= 3; i++) {
    let dayTemperature = document.getElementsByClassName('js-short-info__temperature' + i)[0];
    temperature = degrees == '"C"' ?
      degreeConverter.convertFromFahrenheitToCelcius(dayTemperature.innerText) :
      degreeConverter.convertFromCelciusToFahrenheit(dayTemperature.innerText);

    dayTemperature.innerText = temperature > 0 ? '+' + temperature : temperature;
  }
}