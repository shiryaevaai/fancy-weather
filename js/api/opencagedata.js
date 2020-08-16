export async function findLocation(query, lang) {
  let url = 'https://api.opencagedata.com/geocode/v1/json?q='+query+'&key=22b56595d68142fd89ae8b8e14a644b6&pretty=1&no_annotations=1&language='+lang;
  let res = await fetch(url);
  let data = await res.json();
  return data;
}