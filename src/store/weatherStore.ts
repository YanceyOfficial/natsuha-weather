import {
  observable,
  runInAction,
} from 'mobx';

import {
  IMeta,
  IWeather
} from '../types/weather';

import Taro from '@tarojs/taro';

class WeatherStore {
  @observable public weatherData: IWeather = {};

  @observable public metaData: IMeta = {
    conditionMap: {},
    skycode: {},
  }

  @observable public curSkyCode = 'clear_day';

  constructor() {
    this.weatherData = {
      location: {
        countryName: '',
        displayName: '',
      },
      observation: {
        conditionDescription: '',
        conditionCode: 0,
        localTime: {
          timestamp: new Date(),
        },
        temperature: {
          now: 0,
          high: 0,
          low: 0,
          feelsLike: 0,
        },
        visibility: 0,
        uvIndex: 1,
        uvDescription: 'low',
        humidity: 100,
        dayPartTexts: [],
        windSpeed: 0,
        windDirectionCode: 'South South East',
        barometricPressure: 0,
      },
      precipitations: [{
          timeSlot: "MORNING",
          probability: 0,
        },
        {
          timeSlot: "AFTERNOON",
          probability: 0,
        },
        {
          timeSlot: "EVENING",
          probability: 0,
        },
        {
          timeSlot: "NIGHT",
          probability: 0,
        },
      ],
      sunAndMoon: {
        sunrise: 22980,
        sunset: 64260,
        moonPhase: 1,
      },
      forecasts: {
        daily: [],
        hourly: [],
      }

    };
    this.metaData = {
      conditionMap: {},
      skycode: {},
    };
    this.curSkyCode = 'clear_day';
  }

  public getWeatherById = (woeid = '2151330', lang = 'zh-CN') => {
    wx.cloud.callFunction({
      name: 'getWeatherById',
      data: {
        woeid: '2151849',
        lang: 'en-US',
      }
    }).then((res) => {
      runInAction(() => {
        const weatherResult = res.result.weatherResult;
        this.weatherData = weatherResult.weathers[0];
        this.metaData = weatherResult.meta;
        this.curSkyCode = this.metaData.skycode[this.weatherData.observation.conditionCode];
      })
    }).catch((e) => {
      // 一般来讲这里会报错 在这里加toast即可
      console.log(e);
    });
  }

  public getRegion = () => {
    wx.cloud.callFunction({
      name: 'getRegion',
      data: {
        region: 'sh',
      },
      success(res) {
        console.log(res)
      },
      fail: console.error
    })
  }

  public getWoeid = (lat: number, lon: number) => {
    wx.cloud.callFunction({
        name: 'getWoeid',
        data: {
          lat: lat,
          lon: lon,
        }
      }).then((res) => {
        runInAction(() => {
          const curWoeid = JSON.parse(res.result).location.woeid;
          this.getWeatherById(curWoeid);
        })
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // 通过接口将
  public getPosition = () => {
    Taro.getLocation({
      type: 'gcj02',
    }).then(res => {
      const lat = res.latitude;
      const lon = res.longitude;
      this.getWoeid(lat, lon);
    }).catch(e => {
      console.error(e)
    })
  }
}

const weatherStore = new WeatherStore();

export default weatherStore;
