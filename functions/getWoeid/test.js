/* eslint-disable */

const OAuth = require('oauth')

const header = {
  'Yahoo-App-Id': 'ulaQOr7a',
}

const request = new OAuth.OAuth(
  null,
  null,
  'dj0yJmk9blM2QjMzZmt6OHAyJmQ9WVdrOWRXeGhVVTl5TjJFbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD01Nw--',
  'a93caca1c4925079152c6902576689a856326c4d',
  '1.0',
  null,
  'HMAC-SHA1',
  null,
  header
)

const promise = () => {
  return new Promise(function (resolve, reject) {
    request.get(
      'https://weather-ydn-yql.media.yahoo.com/forecastrss?lang=zh-CN&format=json&lat=37.372&lon=-122.038',
      null,
      null,
      (err, data, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(data);
        }
      }
    )
  });
}

module.exports = promise;
