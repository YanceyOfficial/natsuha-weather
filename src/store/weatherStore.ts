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

import {
  setLoadingToast
} from '../utils/util';

import {
  defaultPhotoUrl
} from '../constants/constants';

class WeatherStore {
  @observable public weatherData: IWeather = {};

  @observable updateKey = 0;

  @observable public metaData: IMeta = {
    conditionMap: {},
    skycode: {},
  }

  @observable public curSkyCode = 'clear_day';

  @observable public isF = true;

  @observable public backgroudImageUrl = '';
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
    this.backgroudImageUrl = defaultPhotoUrl;
  }

  @action
  public renderTrigger = () => {};

  @action
  public handleTemperatureType = (type: boolean) => {
    this.updateKey = Math.random();
    this.isF = type;
    const observation = this.weatherData.observation;
    const forecasts = this.weatherData.forecasts;
    observation.temperature.feelsLike = convertCelsiusFahrenheit(this.isF, observation.temperature.feelsLike);
    observation.temperature.now = convertCelsiusFahrenheit(this.isF, observation.temperature.now);
    observation.temperature.low = convertCelsiusFahrenheit(this.isF, observation.temperature.low);
    observation.temperature.high = convertCelsiusFahrenheit(this.isF, observation.temperature.high);
    observation.visibility = convertKmMiles(this.isF, observation.visibility);
    observation.windSpeed = convertKmMiles(this.isF, observation.windSpeed);
    observation.barometricPressure = convertMillibarsInches(this.isF, observation.barometricPressure);
    forecasts.daily.forEach(value => {
      value.temperature.low = convertCelsiusFahrenheit(this.isF, value.temperature.low);
      value.temperature.high = convertCelsiusFahrenheit(this.isF, value.temperature.high);
    });

    forecasts.hourly.forEach(value => {
      value.temperature.now = convertCelsiusFahrenheit(this.isF, value.temperature.now);
    });
  }

  public getWeatherById = (woeid = '2151330', lang = 'zh-CN') => {
    setLoadingToast(true, '获取天气信息...');
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
        this.backgroudImageUrl = this.weatherData.photos[0].resolutions[5].url;
        setLoadingToast(false);
      })
    }).catch((e) => {
      Taro.showToast({
        title: '拿不到天气数据',
        icon: 'success',
        duration: 2000
      })
      console.log('获取天气' + e);
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
    setLoadingToast(true, '获取城市信息...');
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
        Taro.showToast({
          title: '拿不到城市信息',
          icon: 'success',
          duration: 2000
        })
      });
  }

  public getPosition = () => {
    setLoadingToast(true, '获取经纬度...');
    Taro.getLocation({
      type: 'gcj02',
    }).then(res => {
      const lat = res.latitude;
      const lon = res.longitude;
      this.getWoeid(lat, lon);
    }).catch(e => {
      setLoadingToast(false);
    })
  }
}

const weatherStore = new WeatherStore();

export default weatherStore;
