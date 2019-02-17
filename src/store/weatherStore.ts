import {
  observable,
  runInAction,
} from 'mobx';
import weatherService from '../apis/weatherService';

class WeatherStore {
  @observable public weather: any = {};

  constructor() {
    this.weather = {};
  }

  public getWeatherById =  (woeids: string, lang = 'en-US') => {
    try {
      const res =  weatherService.getWeatherById(woeids, lang);
      runInAction(() => {
        console.log(res)
        // this.weather = res.data;
      });
    } catch (e) {
      // todo
    }
  };
  public getCloudData = () => {
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getWeatherById',
      // 传给云函数的参数
      data: {
        a: 1,
        b: 2,
      },
      success(res) {
        console.log(res.result.sum) // 3
      },
      fail: console.error
    })
  }
}

const weatherStore = new WeatherStore();

export default weatherStore;
