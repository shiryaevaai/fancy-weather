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