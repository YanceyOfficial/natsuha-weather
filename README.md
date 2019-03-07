# Natsuha Weather for WeChat Mini Program

![Natsuha Weather](https://yancey-assets.oss-cn-beijing.aliyuncs.com/natsuha_344.jpg)

## ⚠️关于隐私文件

因为一些文件涉及到私钥, 故未上传至 GitHub, 下面对此说明.

### project.config.json

在**根目录**下创建文件`project.config.json`, 并添加如下代码,

    {
      "miniprogramRoot": "dist/",
      "projectname": "Natsuha-Weather-WeChat",
      "description": "An awesome weather app for WeChat Mini Program.",
      "appid": YOUR_APP_ID,
      "cloudfunctionRoot": "functions/",
      "setting": {
        "urlCheck": true,
        "es6": false,
        "postcss": false,
        "minified": false,
        "newFeature": true
      },
      "compileType": "miniprogram",
      "condition": {}
    }

### functions/getWoeid/index.js

由于众所周知的原因, 微信小程序禁止调用未备案域名的接口, 哪怕是开发环境.
因此这里使用[**云开发**](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)来"反代"
Yahoo Weather API.

其中 `getWoeid` 接口涉及到私钥密钥, 故未上传至 github. 你需要先去**Yahoo developer**申请一个 key, 具体戳[Yahoo Weather API](https://developer.yahoo.com/weather/).

![yahpp key](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190221-135157.jpg)

申请完毕后, 在 `functions/getWoeid` 文件夹下创建 `index.js`, 并添加如下代码:

    /* eslint-disable */

    const cloud = require('wx-server-sdk')
    const OAuth = require('oauth')

    cloud.init()

    const header = {
      'Yahoo-App-Id': YOUR_APP_ID,
    }

    const request = new OAuth.OAuth(
      null,
      null,
      YOUR_CLIENT_ID,
      YOUR_CLIENT_SECRET,
      '1.0',
      null,
      'HMAC-SHA1',
      null,
      header
    )

    exports.main = async (event, context) => new Promise((resolve, reject) => {
      const lat = event.lat;
      const lon = event.lon;
      const lang = event.lang;
      request.get(
        `https://weather-ydn-yql.media.yahoo.com/forecastrss?lang=${lang}&format=json&lat=${lat}&lon=${lon}`,
        null,
        null,
        (err, data, result) => {
          resolve(data);
        }
      )
    })


