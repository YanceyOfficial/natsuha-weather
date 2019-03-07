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

## TODO

- 支持多语言
- 监听滚动的地方加上截流（虽然在我的iPhone XS上目前并不卡）

## Problem

下面是项目中存在的一些问题，一些源于项目本身，还有一些是Taro框架的原因，有兴趣的话欢迎大家一起讨论。

### 图片加载不友好

图片的url来自`aws`，因为众所周知的原因，图片经常会挂掉，
所以有必要在图片挂掉的时候触发`onError`事件，然后给用户一个提示。

因为小程序不支持`new Image()`，所以只能用官方提供的`Image`组件，幸好这个
组件支持`onLoad`和`onError`事件。

加载失败的问题解决了，但因为`aws`的速度太慢，所以正常加载时也很不友好（可以自行体会）

做了一些尝试，比如先加载缩略图，再展示完整图片，但接口提供的最小尺寸的图片也已经达到了
70多k，并且该死的Yahoo恰好将图片url控制大小的那段用了加密，所以这个方式pass掉了。

### ts不能识别`wx`

因为用到了云开发，而Taro现阶段还没有`Taro.cloud(...)`,所以在使用原生的`wx.cloud(...)`时,
ts肯定会报错。

### css module等静态文件 找不到路径

一开始用的`import`来引入静态文件，但报“找不到路径”，可以看下图（但不影响使用）。提了个issue [#2213](https://github.com/NervJS/taro/issues/2213),
按照大佬的回复修改也没解决问题，实在受不了一片红，索性改成了`commonJS`.

![找不到模块](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190219-142504@2x.jpg)

### Taro编译会忽略模版两个之间的空格

这应该是Taro的问题了，我提了个issue [#2261](https://github.com/NervJS/taro/issues/2261)，有兴趣可以跟进一下。
