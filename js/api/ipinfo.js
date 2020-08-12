export async function getIPInfo() {
  let url = 'https://ipinfo.io/geo?token=9a0338ee5a5439';
  let res = await fetch(url);
  let data = await res.json();
  return data;
}
//{
//  "ip": "176.15.33.171",
//    "city": "Moscow",
//      "region": "Moscow",
//        "country": "RU",
//          "loc": "55.7522,37.6156",
//            "org": "AS8402 PJSC Vimpelcom",
//              "postal": "101000",
//                "timezone": "Europe/Moscow"
//}