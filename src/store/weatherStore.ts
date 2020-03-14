import { observable, runInAction, action } from 'mobx';
import Taro from '@tarojs/taro';
import _ from 'lodash';
import {
  convertCelsiusFahrenheit,
  convertKmMiles,
  convertMillibarsInches,
} from '../utils/convert';
import { setLoadingToast, setToast } from '../utils/toast';
import httpClient from '../utils/https';
import { defaultPhotoUrl, toastTxt } from '../constants/constants';
import { IMeta, IWeather } from '../types/weather';
import IRegion from '../types/region';

interface IWeatherRes {
  requestID: string
  weatherResult: {
    meta: IMeta
    weathers: IWeather[]
  }
}

class WeatherStore {
  construtor() {
    this.getRegion = _.debounce(this.getRegion, 150);
  }

  @observable.deep public weatherData: IWeather = {
    location: {
      countryName: '',
      displayName: '',
    },
    observation: {
      conditionDescription: 'Sunny',
      conditionCode: 32,
      localTime: {
        timestamp: '',
      },
      observationTime: {
        hour: 0,
        weekday: 0,
      },
      precipitationProbability: 0,
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
    precipitations: [
      {
        timeSlot: 'MORNING',
        probability: 0,
      },
      {
        timeSlot: 'AFTERNOON',
        probability: 0,
      },
      {
        timeSlot: 'EVENING',
        probability: 0,
      },
      {
        timeSlot: 'NIGHT',
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
    photos: [
      {
        ownerName: '',
        resolutions: [],
      },
    ],
  };

  @observable.deep public metaData: IMeta = {
    conditionMap: {},
    skycode: {
      32: 'clear_day',
    },
  };

  // 当前城市的id
  @observable public curWoeid = '';

  // 当前城市所属国家
  @observable public curCountryName = '--';

  // 当前城市名
  @observable public curCityName = '--';

  // 华式温度 or 摄氏温度
  @observable public isFahrenheit = true;

  // 系统语言
  @observable public systemLanguage = 'en-US';

  // 背景图url
  @observable public backgroudImageUrl = defaultPhotoUrl;

  // 背景图的宽图形式 用于分享
  @observable public widthBackgroudImageUrl = '';

  // 是否展示授权模态框
  @observable public showModal = false;

  // 是否展示搜索框
  @observable public showSearch = false;

  // 搜索状态
  @observable public isSearching = false;

  // 检索（或历史记录）列表
  @observable public regionList: IRegion[] = [];

  // 华氏|摄氏温度换算
  @action
  public handleTemperatureTypeChange = (type: boolean) => {
    this.isFahrenheit = type;
    const observation = this.weatherData.observation;
    const forecasts = this.weatherData.forecasts;
    observation.temperature.feelsLike = convertCelsiusFahrenheit(
      this.isFahrenheit,
      observation.temperature.feelsLike,
    );
    observation.temperature.now = convertCelsiusFahrenheit(
      this.isFahrenheit,
      observation.temperature.now,
    );
    observation.temperature.low = convertCelsiusFahrenheit(
      this.isFahrenheit,
      observation.temperature.low,
    );
    observation.temperature.high = convertCelsiusFahrenheit(
      this.isFahrenheit,
      observation.temperature.high,
    );
    observation.visibility = convertKmMiles(
      this.isFahrenheit,
      observation.visibility,
    );
    observation.windSpeed = convertKmMiles(
      this.isFahrenheit,
      observation.windSpeed,
    );
    observation.barometricPressure = convertMillibarsInches(
      this.isFahrenheit,
      observation.barometricPressure,
    );
    forecasts.daily.forEach(value => {
      value.temperature.low = convertCelsiusFahrenheit(
        this.isFahrenheit,
        value.temperature.low,
      );
      value.temperature.high = convertCelsiusFahrenheit(
        this.isFahrenheit,
        value.temperature.high,
      );
    });

    forecasts.hourly.forEach(value => {
      value.temperature.now = convertCelsiusFahrenheit(
        this.isFahrenheit,
        value.temperature.now,
      );
    });
  };

  @action
  public showSearchDialog = () => {
    this.getStorage();
    this.showSearch = true;
  };

  @action
  public hideSearchDialog = () => {
    this.showSearch = false;
    setTimeout(() => {
      this.isSearching = false;
    }, 350);
  };

  @action
  public handleInputTextChange = (e: any) => {
    this.isSearching = true;
    this.getRegion(e.target.value);
  };

  @action
  public handleSelectRegionChange = (woeid: string, qualifiedName: string) => {
    Taro.setStorage({
      key: woeid.toString(),
      data: qualifiedName,
    }).then(() => {
      this.getWeatherById(woeid);
    });
  };

  @action
  public deleteHistoryItemByWoeid = (woeid: string) => {
    Taro.removeStorage({
      key: woeid.toString(),
    }).then(() => {
      setToast(toastTxt.deleteHistorySuccess, 'success');
      this.getStorage();
    });
  };



  public getWeatherById = async (woeid: string) => {
    setLoadingToast(true, toastTxt.weatherLoading);
    try {
      const res = await httpClient('getWeatherById', {
        woeid,
        lang: this.systemLanguage,
      });
      runInAction(() => {
        this.curWoeid = woeid;
        this.isFahrenheit = true;
        const weatherResult = (res as IWeatherRes).weatherResult;
        this.weatherData = weatherResult.weathers[0];
        this.metaData = weatherResult.meta;
        this.curCountryName = this.weatherData.location.countryName;
        this.curCityName = this.weatherData.location.displayName;
        this.backgroudImageUrl = this.weatherData.photos[0].resolutions[5].url;
        this.widthBackgroudImageUrl = this.weatherData.photos[0].resolutions[2].url;
        setLoadingToast(false);
      });
    } catch (e) {
      setToast(toastTxt.deleteHistoryFail);
      Taro.vibrateLong();
    } finally {
      Taro.stopPullDownRefresh();
    }
  };

  // 根据经纬度反查城市
  public getWoeid = async (
    lat: number,
    lon: number,
    lang = this.systemLanguage,
  ) => {
    setLoadingToast(true, toastTxt.locationLoading);
    try {
      const res = await httpClient('getWoeid', {
        lat,
        lon,
        lang,
      });
      runInAction(() => {
        const location = JSON.parse(res as any).location;
        this.curCountryName = location.country;
        this.curCityName = location.region;
        this.getWeatherById(location.woeid);
      });
    } catch (e) {
      setLoadingToast(false);
      setToast(toastTxt.cityFail);
    }
  };

  public getRegion = async (text: string) => {
    try {
      const res = await httpClient('getRegion', {
        region: encodeURI(text),
      });
      runInAction(() => {
        if ((res as any).regionList) {
          this.regionList = (res as any).regionList;
        }
      });
    } catch (e) {
      setToast(toastTxt.cityFail);
    }
  };

  // 获取历史城市列表
  public getStorage = () => {
    this.regionList = [];
    Taro.getStorageInfo().then(res => {
      res.keys.forEach(key =>
        Taro.getStorage({
          key,
        }).then(res => {
          this.regionList.push({
            woeid: parseInt(key, 10),
            qualifiedName: res.data,
          });
        }),
      );
    });
  };

  public getSetting = () => {
    Taro.getSetting().then(res => {
      if (!res.authSetting['scope.userLocation']) {
        this.showModal = true;
      } else {
        this.showModal = false;
        this.getPosition();
        setToast(toastTxt.coordinatesFail);
      }
    });
  };

  public getPosition = () => {
    // 如果是点击的 detach my location
    if (this.showSearch) {
      this.showSearch = false;
    }
    setLoadingToast(true, toastTxt.coordinatesLoading);
    Taro.getLocation({
      type: 'gcj02',
    })
      .then(res => {
        const lat = res.latitude;
        const lon = res.longitude;
        this.getWoeid(lat, lon);
      })
      .catch(() => {
        setLoadingToast(false);
        // 在每次获取地理坐标失败的时候都要查一下是用户未授权导致的还是纯粹接口请求失败
        this.getSetting();
      });
  };

  public getLanguage = () => {
    Taro.getSystemInfo()
      .then(res => {
        this.systemLanguage = res.language;
        this.getPosition();
      })
      .catch(() => {
        setToast(toastTxt.languageFail);
      });
  };
}

const weatherStore = new WeatherStore();

export default weatherStore;
