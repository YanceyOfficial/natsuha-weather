const cloud = require('wx-server-sdk');
const OAuth = require('oauth');

cloud.init();

const header = {
  'X-Yahoo-App-Id': 'ulaQOr7a',
};

const request = new OAuth.OAuth(
  null,
  null,
  'dj0yJmk9blM2QjMzZmt6OHAyJmQ9WVdrOWRXeGhVVTl5TjJFbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01Nw--',
  'a93caca1c4925079152c6902576689a856326c4d',
  '1.0',
  null,
  'HMAC-SHA1',
  null,
  header,
);

exports.main = async (event, context) =>
  new Promise((resolve, reject) => {
    const lat = event.lat;
    const lon = event.lon;
    const lang = event.lang;
    request.get(
      `https://weather-ydn-yql.media.yahoo.com/forecastrss?lang=${lang}&format=json&lat=${lat}&lon=${lon}`,
      null,
      null,
      (err, data, result) => {
        resolve(data);
      },
    );
  });
