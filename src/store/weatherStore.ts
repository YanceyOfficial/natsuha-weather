import {
  observable,
} from 'mobx';

import IWeatherResult from '../types/weather';

class WeatherStore {
  @observable public weatherData: IWeatherResult = {
    meta: {
      conditionMap: {},
      skycode: {},
    },
    weathers: [],
  };

  constructor() {
    this.weatherData = {
      meta: {
        conditionMap: {},
        skycode: {},
      },
      weathers: [],
    };
  }

  public getWeatherById = () => {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'getWeatherById',
      data: {
        woeid: '2168606',
        lang: 'en-US',
      },
      success(res) {
        this.weather = res.result;
        console.log(res.result)
      },
      fail: console.error
    })
  }

  public getRegion = () => {
    wx.cloud.init();
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
