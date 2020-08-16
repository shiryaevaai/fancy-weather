import dictionaries from '../dictionaries/index.js';

export function updateLabels(lang = 'en') {
  let feelsLikeLabel = document.getElementsByClassName('js-feels-like-title')[0];
  let label = dictionaries[lang].feelsLikeLabel;
  feelsLikeLabel.innerText = label;

  let windLabel = document.getElementsByClassName('js-wind-title')[0];
  label = dictionaries[lang].windLabel;
  windLabel.innerText = label;

  let windSpeedLabel = document.getElementsByClassName('js-wind-speed')[0];
  label = dictionaries[lang].windSpeedLabel;
  windSpeedLabel.innerText = label;

  let humidityLabel = document.getElementsByClassName('js-humidity-title')[0];
  label = dictionaries[lang].humidityLabel;
  humidityLabel.innerText = label;

  let searchInput = document.getElementsByClassName('js-search-input')[0];
  label = dictionaries[lang].searchPlaceholder;
  searchInput.placeholder = label;

  let searchButton = document.getElementById("search-button");
  label = dictionaries[lang].searchButton;
  searchButton.value = label;

  let latitudeLabel = document.getElementsByClassName('js-latitude-title')[0];
  label = dictionaries[lang].latitudeLabel;
  latitudeLabel.innerText = label;

  let longitudeLabel = document.getElementsByClassName('js-longitude-title')[0];
  label = dictionaries[lang].longitudeLabel;
  longitudeLabel.innerText = label;
}
