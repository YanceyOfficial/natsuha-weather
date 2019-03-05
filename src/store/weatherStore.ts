import {
  observable,
  runInAction,
  action,
} from 'mobx';

import _ from 'lodash';

import Taro from '@tarojs/taro';

import {
  IMeta,
  IWeather
} from '../types/weather';

import IRegion from '../types/region';

import {
  convertCelsiusFahrenheit,
  convertKmMiles,
  convertMillibarsInches
} from '../utils/convert';

import {
  setLoadingToast,
  setToast,
} from '../utils/util';

import {
  defaultPhotoUrl
} from '../constants/constants';

class WeatherStore {
  construtor() {
    this.getRegion = _.debounce(this.getRegion, 150);
  }
  @observable public weatherData: IWeather = {};

  @observable public metaData: IMeta = {
    conditionMap: {},
    skycode: {},
  }

  @observable public curSkyCode = 'clear_day';

  @observable public curWoeid = '';

  @observable public isF = true;

  @observable public FFlag = false;

  @observable public systemLanguage = '';

  @observable public backgroudImageUrl = '';

  @observable public widthBackgroudImageUrl = '';

  @observable public showModal = false;

  @observable public showSearch = false;

  @observable public isSearching = false;

  @observable public inputText = '';

  @observable public regionList: IRegion[] = [];


  constructor() {
    this.weatherData = {
      location: {
        countryName: 'Loading...',
        displayName: 'Loading...',
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
    this.backgroudImageUrl = defaultPhotoUrl;
    this.FFlag = false;
    this.systemLanguage = '';
    this.widthBackgroudImageUrl = '';
    this.showModal = false;
    this.showSearch = false;
    this.inputText = '';
    this.regionList = [];
    this.curWoeid = '';
    this.isSearching = false;
  }

  public getStorage = () => {
    Taro.getStorageInfo().then(res => {
      this.regionList = [];
      res.keys.forEach(key => Taro.getStorage({
        key: key
      }).then(res => {
        this.regionList.push({
          woeid: parseInt(key, 10),
          qualifiedName: res.data,
        })
      }))
    })
  }

  @action
  public handleTemperatureType = (type: boolean) => {
    this.isF = type;
    const observation = this.weatherData.observation;
    const forecasts = this.weatherData.forecasts;

    if (this.FFlag === this.isF) {
      this.FFlag = !this.isF;
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
  }

  @action
  public handleSearchChange = () => {
    if (!this.showSearch) {
      this.regionList = [];
      Taro.getStorageInfo().then(() => {
        this.getStorage();
      })
      this.showSearch = true;
    }
  }

  @action
  public handleInputTextChange = (e: any) => {
    this.isSearching = true;
    this.getRegion(e.target.value);
  }

  @action
  public handleSelectRegionChange = (woeid: string, qualifiedName: string) => {
    this.curWoeid = woeid;
    this.showSearch = false;
    Taro.setStorage({
      key: woeid.toString(),
      data: qualifiedName,
    }).then(res => {
      this.getWeatherById();
    })
  }

  @action
  public hideSearch = () => {
    this.isSearching = false;
    this.showSearch = false;
  }

  @action
  public deleteHistoryItemByWoeid = (woeid: string) => {
    Taro.removeStorage({
      key: woeid.toString()
    }).then(res => {
      setToast('删除成功', 'success');
      this.getStorage();
    })
  }

  public getWeatherById = () => {
    setLoadingToast(true, '获取天气信息...');
    wx.cloud.callFunction({
      name: 'getWeatherById',
      data: {
        woeid: this.curWoeid,
        lang: this.systemLanguage,
      }
    }).then((res: any) => {
      runInAction(() => {
        this.isF = true;
        this.FFlag = false;
        const weatherResult = res.result.weatherResult;
        this.weatherData = weatherResult.weathers[0];
        this.metaData = weatherResult.meta;
        this.curSkyCode = this.metaData.skycode[this.weatherData.observation.conditionCode];
        this.backgroudImageUrl = this.weatherData.photos[0].resolutions[5].url;
        this.widthBackgroudImageUrl = this.weatherData.photos[0].resolutions[2].url;
        setLoadingToast(false);
        Taro.stopPullDownRefresh();
      })
    }).catch((e) => {
      setToast('获取天气失败', 'none');
      Taro.stopPullDownRefresh();
    })
  }

  public getWoeid = (lat: number, lon: number) => {
    setLoadingToast(true, '获取城市信息...');
    wx.cloud.callFunction({
        name: 'getWoeid',
        data: {
          lat: lat,
          lon: lon,
          lang: this.systemLanguage
        }
      }).then((res: any) => {
        runInAction(() => {
          const location = JSON.parse(res.result);
          this.curWoeid = location.woeid;
          this.weatherData.location.countryName = location.country;
          this.weatherData.location.displayName = location.region;
          this.getWeatherById();
        })
      })
      .catch(() => {
        setLoadingToast(false);
        setToast('获取城市信息失败', 'none');
      });
  }

  public getPosition = () => {
    setLoadingToast(true, '获取地理坐标...');
    Taro.getLocation({
      type: 'gcj02',
    }).then(res => {
      const lat = res.latitude;
      const lon = res.longitude;
      this.getWoeid(lat, lon);
    }).catch(() => {
      setLoadingToast(false);
      this.getSetting();
    })
  }

  public getLanguage = () => {
    this.showModal = false;
    Taro.getSystemInfo().then(res => {
      this.systemLanguage = res.language;
      this.getPosition();
    }).catch(() => {
      setToast('获取系统语言失败', 'none');
    })
  }

  public getSetting = () => {
    Taro.getSetting().then(res => {
      if (!res.authSetting['scope.userLocation']) {
        this.showModal = true;
      } else {
        setToast('获取地理坐标失败', 'none');
      }
    })
  }

  public getRegion = (text: string) => {
    wx.cloud.callFunction({
        name: 'getRegion',
        data: {
          region: text,
        },
      }).then((res: any) => {
        runInAction(() => {
          this.regionList = res.result.regionList;
        })
      })
      .catch(() => {
        setToast('获取城市信息失败', 'none');
      });
  }
}

const weatherStore = new WeatherStore();

export default weatherStore;
