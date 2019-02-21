/* eslint-disable */

const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

exports.main = async (event, context) => {
  const woeid = event.woeid;
  const lang = event.lang;
  const res = await rp({
    method: 'get',
    uri: `https://www.yahoo.com/news/_tdnews/api/resource/WeatherService;woeids=${woeid}?feature=caasSmartphone&lang=${lang}`,
    json: true
  }).then((body) => {
    return {
      weatherResult: body
    }
  }).catch(err => {
    return err;
  })
  return res;
}
