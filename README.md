# Natsuha Weather for WeChat Mini Program

![Natsuha Weather](https://yancey-assets.oss-cn-beijing.aliyuncs.com/natsuha_344.jpg)

## 关于隐私 ⚠️

因为一些文件涉及到私钥, 故未上传至 github, 下面做一下说明.

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

因为众所周知的原因, 微信小程序禁止调用未备案域名的接口, 哪怕是开发环境.
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


## 关于接口说明

### 关于降水量 icon

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

### 关于天气状况 icon

    // 拿到conditionCode
    const conditionCode = weathers[0].observation.conditionCode

    // 在meta.skycode中找到对应的icon的名称
    const iconName = meta.skycode.conditionCode

    // 填充url
    const iconUrl = `https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/${iconName}@2x.png`

### flickr logo

    https://s.yimg.com/os/weather/1.0.1/flickr/logo@3x.png

## 关于风向

拿到 `windDirection`, 然后对相应的 svg 添加 `transform: rotate(windDirection deg)`

### 关于月相

拿到 `sunAndMoon.moonPhase`, 然后填充 url

    const moonIcon = `https://s.yimg.com/os/weather/1.0.1/moon/ic_moonphase_${sunAndMoon.moonPhase}@3x.png`

### 日出日落

以日出为例, 拿到 `sunAndMoon.sunrise`, 比如是 23700, 按下面的代码操作, 也就是日出时间是 6:35

    new Date(23700 * 1000).getUTCHours() // 6
    new Date(23700 * 1000).getUTCMinutes() // 35

关于日落, 如果要求 AM/PM 格式, 可以通过如下方法转换.

    new Date(63720 * 1000).getUTCHours() //（17时）
    new Date(63720 * 1000).getUTCHours() % 12 || 12 //（下午5时）

### Wind & Pressure

#### 风向

`observation.windDirectionCode` 提供当前风向的全称, 返回一个字符串,
如 `East North East`, `East`.为了简洁, 当字符串的单词树**大于 1**时,
取每个单词首字母组成新的字符串渲染; 而当**等于 1 时**, 直接渲染此字符串.
因此上述示例分别返回 `ENE` 和 `East`.

#### 气压

`observation.barometricPressure` 提供当前气压值, 是一个 float 类型的数字, 渲染时保留一位小数即可.

🔁 单位换算 :

1 Millibars(摄氏温度) = 0.0296134 Inches(华氏温度)
1 Inches(华氏温度) = 33.768496694064 Millibars(摄氏温度)

#### 风速以及风速图像

##### 风速

`observation.windSpeed` 提供当前风速, 是一个 int 类型的数字.

🔁 单位换算 :

1 km/h(摄氏温度) = 0.621371192 mph(华氏温度)
1 mph(华氏温度) = 1.609344 km/h(摄氏温度)

##### 风速图像

关于转速函数参考 `src/utils/util.ts` 的 `getWindSpeed()`

## 🐛bug

    {/* Taro编译忽略前空格的bug https://github.com/NervJS/taro/issues/2261 */}
