import {
  observable,
  runInAction,
  action,
} from 'mobx';

import {
  IMeta,
  IWeather
} from '../types/weather';

import {
  convertCelsiusFahrenheit,
  convertKmMiles,
  convertMillibarsInches
} from '../utils/convert';

import Taro from '@tarojs/taro';

class WeatherStore {
  @observable public weatherData: IWeather = {};

  @observable updateKey = 0;

  @observable public metaData: IMeta = {
    conditionMap: {},
    skycode: {},
  }

  @observable public curSkyCode = 'clear_day';

  @observable public isF = true;

  constructor() {
    this.weatherData = {
      location: {
        countryName: 'China',
        displayName: 'Beijing',
      },
      observation: {
        conditionDescription: 'Sunny',
        conditionCode: 0,
        localTime: {
          timestamp: '',
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
        sunrise: 0,
        sunset: 0,
        moonPhase: 1,
      },
      forecasts: {
        daily: [],
        hourly: [],
      },
      photos: [{
        ownerName: '',
        resolutions: [],
      }]

    };
    this.metaData = {
      conditionMap: {},
      skycode: {},
    };
    this.curSkyCode = 'clear_day';
    this.isF = true;
    this.updateKey = 0;
  }

  @action renderTrigger = () => {};

  @action
  public handleTemperatureType = (type: boolean) => {
    this.updateKey = Math.random();
    this.isF = type;
    this.weatherData.observation.temperature.feelsLike = convertCelsiusFahrenheit(this.isF, this.weatherData.observation.temperature.feelsLike);
    this.weatherData.observation.temperature.now = convertCelsiusFahrenheit(this.isF, this.weatherData.observation.temperature.now);
    this.weatherData.observation.temperature.low = convertCelsiusFahrenheit(this.isF, this.weatherData.observation.temperature.low);
    this.weatherData.observation.temperature.high = convertCelsiusFahrenheit(this.isF, this.weatherData.observation.temperature.high);
    this.weatherData.observation.visibility = convertKmMiles(this.isF, this.weatherData.observation.visibility);
    this.weatherData.observation.windSpeed = convertKmMiles(this.isF, this.weatherData.observation.windSpeed);
    this.weatherData.observation.barometricPressure = convertMillibarsInches(this.isF, this.weatherData.observation.barometricPressure);
    for (let i = 0; i < this.weatherData.forecasts.daily.length; i += 1) {
      this.weatherData.forecasts.daily[i].temperature.low = convertCelsiusFahrenheit(this.isF, this.weatherData.forecasts.daily[i].temperature.low);
      this.weatherData.forecasts.daily[i].temperature.high = convertCelsiusFahrenheit(this.isF, this.weatherData.forecasts.daily[i].temperature.high);
    }
    for (let i = 0; i < this.weatherData.forecasts.hourly.length; i += 1) {
      this.weatherData.forecasts.hourly[i].temperature.now = convertCelsiusFahrenheit(this.isF, this.weatherData.forecasts.hourly[i].temperature.now);
    }
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
      // 根据woeid拿不到天气信息
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
        // 根据经纬度拿不到woeid
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
      // 经纬度获取失败
      console.error(e)
    })
  }
}

const weatherStore = new WeatherStore();

export default weatherStore;
