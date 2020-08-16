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