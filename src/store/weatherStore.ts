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
  @observable public weatherData: IWeather = {
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
      photos: [],
    }
  };

  @observable public metaData: IMeta = {
    conditionMap: {},
    skycode: {},
  }

  @observable public curSkyCode = '';

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
        photos: [],
      }
    };
    this.metaData = {
      conditionMap: {},
      skycode: {},
    };
    this.curSkyCode = 'clear_day';
  }

  // @action
  public getWeatherById = (woeid = '2151330', lang = 'zh-CN') => {
    wx.cloud.callFunction({
      name: 'getWeatherById',
      data: {
        woeid,
        lang,
      }
    }).then((res) => {
      runInAction(() => {
        const weatherResult = res.result.weatherResult;
        this.weatherData = weatherResult.weathers[0];
        this.metaData = weatherResult.meta;
        this.curSkyCode = this.metaData.skycode[this.weatherData.observation.conditionCode];
      })
    }).catch((e) => {
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
        console.log(e);
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
      console.log(e)
    })
  }
}

const weatherStore = new WeatherStore();

export default weatherStore;
