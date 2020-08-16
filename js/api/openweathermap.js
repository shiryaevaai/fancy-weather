const appId = '2ef2b647b3a3650200d94767b74c5d49';

export async function getWeatherInfoByCityName(city, lang) {
  let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&lang=' + lang + '&units=metric&cnt=4&APPID=' + appId;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data);
  console.log(url);
  return data;
}

export async function getWeatherInfoByCoords(lat, lon, lang) {
  let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&lang=' + lang + '&units=metric&cnt=4&APPID=' + appId;
  let res = await fetch(url);
  let data = await res.json();
  console.log(url);
  return data;
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