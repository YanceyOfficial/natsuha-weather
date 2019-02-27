# Natsuha Weather for WeChat Mini Program

An awesome weather app for WeChat mini program.

![Natsuha Weather](https://yancey-assets.oss-cn-beijing.aliyuncs.com/natsuha_344.jpg)

## 关于隐私 ⚠️

因为一些文件涉及到密钥，所以没有上传到 github,下面做一下说明。

### project.config.json

因为此文件涉及到微信小程序的 **appid**， 所以忽略上传。在**根目录**下创建文件`project.config.json`，添加如下代码：

    {
      "miniprogramRoot": "dist/",
      "projectname": "Natsuha-Weather-WeChat",
      "description": "An awesome weather app for WeChat mini program.",
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

因为众所周知的原因，微信小程序禁止调用未备案域名的接口，哪怕是开发环境。因此这里使用[**云开发**](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)来“反代” Yahoo Weather API.

其中 `getWoeid` 接口涉及到密钥，故忽略此文件的上传。你需要先去 Yahoo developer 申请一个 key, 具体戳 [Yahoo Weather API](https://developer.yahoo.com/weather/).

![yahpp key](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190221-135157.jpg)

申请完毕后，在 `functions/getWoeid` 文件夹下创建 `index.js`，添加如下代码：

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
      request.get(
        `https://weather-ydn-yql.media.yahoo.com/forecastrss?format=json&lat=${lat}&lon=${lon}`,
        null,
        null,
        (err, data, result) => {
          resolve(data);
        }
      )
    })

## 关于降水量 icon

    // 降雨量为0-9
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_0@2x.png

    // 降雨量为10-19
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_10@2x.png

    // 降雨量为20-29
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_20@2x.png

    // 降雨量为30-39
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_30@2x.png

    // 降雨量为40-49
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_40@2x.png

    // 降雨量为50-59
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_50@2x.png

    // 降雨量为60-69
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_60@2x.png

    // 降雨量为70-79
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_70@2x.png

    // 降雨量为80-89
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_80@2x.png

    // 降雨量为90-99
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_90@2x.png

    // 降雨量为100
    https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_100@2x.png

## 关于天气状况 icon

    // 拿到conditionCode
    const conditionCode = weathers[0].observation.conditionCode

    // 在meta.skycode中找到对应的icon的名称
    const iconName = meta.skycode.conditionCode

    // 填充url
    const iconUrl = `https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/${iconName}@2x.png`

## flickr logo

    https://s.yimg.com/os/weather/1.0.1/flickr/logo@3x.png

## 关于风向

拿到 `windDirection`，然后对相应的 svg 添加 `transform: rotate(windDirection deg)`

## 关于月相

拿到 `sunAndMoon.moonPhase`, 然后填充 url

    const moonIcon = `https://s.yimg.com/os/weather/1.0.1/moon/ic_moonphase_${sunAndMoon.moonPhase}@3x.png`

## 关于日出日落

以日出为例，拿到 `sunAndMoon.sunrise`，比如是 23700，按下面的代码操作，也就是日出时间是 6:35

    new Date(23700 * 1000).getUTCHours() // 6
    new Date(23700 * 1000).getUTCMinutes() // 35

关于日落，如果要求 AM/PM 格式，可以通过如下方法转换。

    new Date(63720 * 1000).getUTCHours() //（17时）
    new Date(63720 * 1000).getUTCHours() % 12 || 12 //（下午5时）

## Wind & Pressure

### 风向

`observation.windDirectionCode` 提供当前风向的全称，返回一个英文字符串，
如 `East North East`, `East`, 为了简洁，当次字符串包含的单词**大于 1**时，
只显示每个单词首字母；而当**等于 1 时**，直接渲染此字符串，
因此上述示例分别返回 `ENE` 和 `East`。

### 气压

`observation.barometricPressure` 提供当前气压值，是一个 float 类型的数字，渲染时保留一位小数即可。
这里涉及到 Millibars 和 Inches 之间的转换，其中**摄氏温度**对应 **Millibars**，
**华氏温度**对应**Inches**

换算公式：

    1 英寸汞柱 = 33.768496694064 毫巴
    1 毫巴 = 0.0296134 英寸汞柱

### 风速以及风速图像

#### 风速

`observation.windSpeed` 提供当前风速，单位是(mph华氏），是一个 int 类型的数字，和 m/s(摄氏)换算

#### 风速图

关于转速函数参考 `src/utils/util.ts` 的 `getWindSpeed()`
