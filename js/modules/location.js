export function updateLocation(name, country, data, lang = 'en') {
  let locationName = document.getElementsByClassName('js-location-name')[0];
  locationName.innerText = name + ', ' + country;

  let latArray = data.coord.lat.toString().split('.');
  let latDegrees = latArray[0];
  let latMinutes = latArray[1] !== undefined ? latArray[1].substr(0, 2) : '00';

  let lonArray = data.coord.lon.toString().split('.');
  let lonDegrees = lonArray[0];
  let lonMinutes = lonArray[1] !== undefined ? lonArray[1].substr(0, 2) : '00';

  let latitude = document.getElementsByClassName('js-location-latitude')[0];
  latitude.innerText = latDegrees + '\xB0' + latMinutes + '\'';

  let longitude = document.getElementsByClassName('js-location-longitude')[0];
  longitude.innerText = lonDegrees + '\xB0' + lonMinutes + '\'';

  let iframe = document.getElementsByClassName('js-map')[0];
  iframe.src = 'https://www.google.com/maps/embed/v1/view?center=' + data.coord.lat + ',' + data.coord.lon + '&zoom=10&key=AIzaSyBWWZnqHV3asW7DM3yCQ0dxSHjj_J9LkwE&language=' + lang;
}