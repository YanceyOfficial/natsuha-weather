/* eslint-disable */

// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

exports.main = async (event, context) => {
  const region = event.region;
  const res = await rp({
    method: 'get',
    uri: `https://www.yahoo.com/news/_tdnews/api/resource/WeatherSearch;text=${region}`,
    json: true
  }).then((body) => {
    return body
  }).catch(err => {
    return err;
  })
  return res;
}
