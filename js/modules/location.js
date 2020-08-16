export function updateLocation(name, country, data, lang = 'en') {
  let locationName = document.getElementsByClassName('js-location-name')[0];
  locationName.innerText = name + ', ' + country;

  let latArray = data.coord.lat.toString().split('.');
  let lonArray = data.coord.lon.toString().split('.');

  let latitude = document.getElementsByClassName('js-location-latitude')[0];
  latitude.innerText = latArray[0] + '\xB0' + latArray[1].substr(0, 2) + '\'';

  let longitude = document.getElementsByClassName('js-location-longitude')[0];
  longitude.innerText = lonArray[0] + '\xB0' + lonArray[1].substr(0, 2) + '\'';

  let iframe = document.getElementsByClassName('js-map')[0];
  iframe.src = 'https://www.google.com/maps/embed/v1/view?center=' + data.coord.lat + ',' + data.coord.lon + '&zoom=10&key=AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE&language=' + lang;
}