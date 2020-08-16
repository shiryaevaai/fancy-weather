export async function getIPInfo() {
  let url = 'https://ipinfo.io/geo?token=9a0338ee5a5439';
  let res = await fetch(url);
  let data = await res.json();
  return data;
}