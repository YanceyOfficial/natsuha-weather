# Natsuha Weather for WeChat Mini Program

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4bfa9469141e41949181fd7f0452c196)](https://app.codacy.com/app/YanceyOfficial/Natsuha-Weather?utm_source=github.com&utm_medium=referral&utm_content=YanceyOfficial/Natsuha-Weather&utm_campaign=Badge_Grade_Dashboard)

## Introduction

Natsuha is a weather app that created with [Taro](https://github.com/NervJS/taro) 
and Yahoo Weather API for WeChat Mini Program. Now the first official version(v1.0.0) is released, 
welcome to use and fork.

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

In the project directory, you can run:

### `yarn dev:weapp`

Runs the app in the development mode.<br>
Open the developer tools of WeChat to view it.

The page will be deployed if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build:weapp`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
The app is ready to be deployed!

## Privacy

Because the following files refer to private key, those files are not uploaded to GitHub, 
you must create them manually.

### getWoeid

You must apply a key in [Yahoo Weather API](https://developer.yahoo.com/weather/) at first.

![yahoo key](https://yancey-assets.oss-cn-beijing.aliyuncs.com/Jietu20190221-135157.jpg)

Then create a file called `index.js` in `functions/getWoeid`, and insert the following codes.

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

- Support multiple languages
- Optimize performance
- Optimize image loading
- Support Test
- Move the search component to a new page

## License

Natsuha Weather is [MIT licensed](https://opensource.org/licenses/MIT).
