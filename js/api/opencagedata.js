export async function findLocation(query) {
  let url = 'https://api.opencagedata.com/geocode/v1/json?q='+query+'&key=22b56595d68142fd89ae8b8e14a644b6&pretty=1&no_annotations=1';
  let res = await fetch(url);
  let data = await res.json();
  return data;
}


//{
//  "documentation" : "https://opencagedata.com/api",
//    "licenses" : [
//      {
//        "name": "see attribution guide",
//        "url": "https://opencagedata.com/credits"
//      }
//    ],
//      "rate" : {
//    "limit" : 2500,
//      "remaining" : 2497,
//        "reset" : 1597622400
//  },
//  "results" : [
//    {
//      "bounds": {
//        "northeast": {
//          "lat": 55.9577717,
//          "lng": 37.9674277
//        },
//        "southwest": {
//          "lat": 55.4913076,
//          "lng": 37.290502
//        }
//      },
//      "components": {
//        "ISO_3166-1_alpha-2": "RU",
//        "ISO_3166-1_alpha-3": "RUS",
//        "_category": "place",
//        "_type": "city",
//        "city": "\u041c\u043e\u0441\u043a\u0432\u0430",
//        "continent": "Europe",
//        "country": "\u0420\u043e\u0441\u0441\u0438\u044f",
//        "country_code": "ru",
//        "state": "\u041c\u043e\u0441\u043a\u0432\u0430",
//        "state_district": "\u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433"
//      },
//      "confidence": 2,
//      "formatted": "\u041c\u043e\u0441\u043a\u0432\u0430, \u0426\u0435\u043d\u0442\u0440\u0430\u043b\u044c\u043d\u044b\u0439 \u0430\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043d\u044b\u0439 \u043e\u043a\u0440\u0443\u0433, \u0420\u043e\u0441\u0441\u0438\u044f",
//      "geometry": {
//        "lat": 55.7504461,
//        "lng": 37.6174943
//      }
//    },
//...
//  ],
//    "status" : {
//    "code" : 200,
//      "message" : "OK"
//  },
//  "stay_informed" : {
//    "blog" : "https://blog.opencagedata.com",
//      "twitter" : "https://twitter.com/OpenCage"
//  },
//  "thanks" : "For using an OpenCage API",
//    "timestamp" : {
//    "created_http" : "Sun, 16 Aug 2020 06:16:39 GMT",
//      "created_unix" : 1597558599
//  },
//  "total_results" : 10
//}