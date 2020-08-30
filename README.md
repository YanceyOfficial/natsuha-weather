# ☁️ Natsuha Weather

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4bfa9469141e41949181fd7f0452c196)](https://app.codacy.com/app/YanceyOfficial/Natsuha-Weather?utm_source=github.com&utm_medium=referral&utm_content=YanceyOfficial/Natsuha-Weather&utm_campaign=Badge_Grade_Dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/YanceyOfficial/Natsuha-Weather.svg?branch=master)](https://travis-ci.com/YanceyOfficial/Natsuha-Weather)
[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com/YanceyOfficial/Natsuha-Weather)
[![Node](https://img.shields.io/badge/node-%3E%3D12.16.0-green.svg)](https://github.com/YanceyOfficial/Natsuha-Weather)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/YanceyOfficial/Natsuha-Weather/pulls)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FYanceyOfficial%2FNatsuha-Weather.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FYanceyOfficial%2FNatsuha-Weather?ref=badge_shield)

## Introduction

Natsuha is a weather app that created with [Taro](https://github.com/NervJS/taro)
and Yahoo Weather API for WeChat Mini Program. Now the stable version(v3.0.0) is released,
welcome to experience and star.

![Natsuha Weather](https://yancey-assets.oss-cn-beijing.aliyuncs.com/natsuha_344.jpg)

![effects image](https://yancey-assets.oss-cn-beijing.aliyuncs.com/barcelona.jpg)

## Features

- Pull down to refresh
- Swtich temperature between Fahrenheit and Celsius
- Display the weather condition by hour
- Display the weather condition by day
- Display the wind direction and speed
- Display the sun and moon
- Display the precipitation forecast
- Search weather information by city name

## Available Scripts

### `yarn global add @tarojs/cli`

Firstly you should install the `@tarojs/cli` globally.

### `yarn install`

Install dependencies.

### `yarn dev:weapp`

Runs the app in the development mode. Open the developer tools of WeChat to view it. The app will be deployed if you make edits. You will also see any lint errors in the console.

### `yarn build:weapp`

Builds the app for production to the `dist` folder. It correctly bundles the app in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. The app is ready to be deployed!

## Privacy

The following files are not uploaded to GitHub because of private key, you must create them manually.

### getWoeid

You need apply a key in [Yahoo Weather API](https://developer.yahoo.com/weather/) at first.

![yahoo key](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190221-135157.jpg)

Then create a file `index.js` in `functions/getWoeid`, and insert the following codes with your keys.

```js
/* eslint-disable */

const cloud = require('wx-server-sdk');
const OAuth = require('oauth');

cloud.init();

const header = {
  'Yahoo-App-Id': YOUR_APP_ID,
};

const request = new OAuth.OAuth(
  null,
  null,
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
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
```

## TODOs

- Support multiple languages
- Optimize performance
- Optimize image loading
- Support Test
- Move the search component to a new page
- Drag and Drop
- Display multi city by swipe

## Change Logs

### v3.0.0

Update elements of Yahoo Wether API. (2020-08-30)

### v2.0.0

Upgrage Taro to v2.0.6 and code optimization. (2020-03-14)

### v1.0.4

Upgrage Taro to v1.3.12 and fix bugs. (2019-08-10)

### v1.0.3

Fix bug of Wind Component. (2019-04-18)

### v1.0.2

Add Serach Component. (2019-03-11)

### v1.0.1

Optimization code. (2019-03-07)

### v1.0.0

Publish the first version. (2019-03-01)

## License

Natsuha Weather is [MIT licensed](https://opensource.org/licenses/MIT).

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FYanceyOfficial%2FNatsuha-Weather.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FYanceyOfficial%2FNatsuha-Weather?ref=badge_large)
