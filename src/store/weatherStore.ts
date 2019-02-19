import {
  observable,
  runInAction,
} from 'mobx';

import {
  IMeta,
  IWeather
} from '../types/weather';

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
    this.weatherData = {};
    this.metaData = {
      conditionMap: {},
      skycode: {},
    };
    this.curSkyCode = 'clear_day';
  }

  // @action
  public getWeatherById = () => {
    wx.cloud.callFunction({
      name: 'getWeatherById',
      data: {
        woeid: '15015370',
        lang: 'ja',
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
      // 云函数名称
      name: 'getRegion',
      // 传给云函数的参数
      data: {
        region: 'sh',
      },
      success(res) {
        console.log(res)
      },
      fail: console.error
    })
  }
}

const weatherStore = new WeatherStore();

export default weatherStore;
