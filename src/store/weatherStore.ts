import {
  observable,
  runInAction,
  action
} from 'mobx';
import Taro from '@tarojs/taro';
import _ from 'lodash';
import {
  convertCelsiusFahrenheit,
  convertKmMiles,
  convertMillibarsInches,
} from '../utils/convert';
import {
  setLoadingToast,
  setToast,
  httpClient,
} from '../utils/util';
import {
  defaultPhotoUrl,
  toastTxt
} from '../constants/constants';
import {
  IMeta,
  IWeather
} from '../types/weather';
import IRegion from '../types/region';

// 让Taro的Prosise支持finally
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback && callback()).then(() => value),
    reason =>
    P.resolve(callback && callback()).then(() => {
      throw reason;
    }),
  );
};

class WeatherStore {
  construtor() {
    this.getRegion = _.debounce(this.getRegion, 150);
  }

  @observable public weatherData: IWeather = {};

  @observable public metaData: IMeta = {
    conditionMap: {},
    skycode: {},
  };

  // 当前显示的城市的id
  @observable public curWoeid = '';

  // 华式温度 or 摄氏温度
  @observable public isFahrenheit = true;

  // 系统语言
  @observable public systemLanguage = '';

  // 背景图url
  @observable public backgroudImageUrl = '';

  // 背景图的宽图形式 用于分享
  @observable public widthBackgroudImageUrl = '';

  // 是否展示授权模态框
  @observable public showModal = false;

  // 是否展示搜索框
  @observable public showSearch = false;

  // 搜索状态
  @observable public isSearching = false;

  // 输入框文本
  @observable public inputText = '';

  // 检索（或历史记录）列表
  @observable public regionList: IRegion[] = [];

  constructor() {
    this.weatherData = {
      location: {
        countryName: 'Loading...',
        displayName: '--',
      },
      observation: {
        conditionDescription: 'Sunny',
        conditionCode: 32,
        localTime: {
          timestamp: new Date().toString(),
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
      photos: [{
        ownerName: '',
        resolutions: [],
      }, ],
    };
    this.metaData = {
      conditionMap: {},
      skycode: {
        32: 'clear_day',
      },
    };
    this.isFahrenheit = true;
    this.backgroudImageUrl = defaultPhotoUrl;
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
      res.keys.forEach(key =>
        Taro.getStorage({
          key: key,
        }).then(res => {
          this.regionList.push({
            woeid: parseInt(key, 10),
            qualifiedName: res.data,
          });
        }),
      );
    });
  };

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
    if (!this.showSearch) {
      this.regionList = [];
      Taro.getStorageInfo().then(() => {
        this.getStorage();
      });
      this.showSearch = true;
    }
  };

  @action
  public handleInputTextChange = (e: any) => {
    this.isSearching = true;
    this.getRegion(e.target.value);
  };

  /*
   * @BUG 假设当前是北京，在选择了天津后，如果获取天津的天气失败，curWoeid不应该被设置成天津的
   */
  @action
  public handleSelectRegionChange = (woeid: string, qualifiedName: string) => {
    this.curWoeid = woeid;
    this.showSearch = false;
    Taro.setStorage({
      key: woeid.toString(),
      data: qualifiedName,
    }).then(res => {
      this.getWeatherById();
    });
  };

  @action
  public hideSearch = () => {
    this.isSearching = false;
    this.showSearch = false;
  };

  @action
  public deleteHistoryItemByWoeid = (woeid: string) => {
    Taro.removeStorage({
      key: woeid.toString(),
    }).then(res => {
      setToast(toastTxt.deleteHistorySuccess, 'success');
      this.getStorage();
    });
  };

  public getWeatherById = () => {
    setLoadingToast(true, toastTxt.weatherLoading);
    httpClient('getWeatherById', {
        woeid: this.curWoeid,
        lang: this.systemLanguage,
      }).then(res => {
        runInAction(() => {
          this.isFahrenheit = true;
          const weatherResult = res.weatherResult;
          this.weatherData = weatherResult.weathers[0];
          this.metaData = weatherResult.meta;
          this.backgroudImageUrl = this.weatherData.photos[0].resolutions[5].url;
          this.widthBackgroudImageUrl = this.weatherData.photos[0].resolutions[2].url;
          setLoadingToast(false);
        });
      }).catch((e: any) => {
        setToast(toastTxt.deleteHistoryFail);
      })
      .finally(() => {
        Taro.stopPullDownRefresh();
      });
  };

  // 根据经纬度反查城市
  public getWoeid = (lat: number, lon: number) => {
    setLoadingToast(true, toastTxt.locationLoading);
    httpClient('getWoeid', {
        lat,
        lon,
        lang: this.systemLanguage,
      })
      .then((res: any) => {
        runInAction(() => {
          const location = JSON.parse(res).location;
          this.curWoeid = location.woeid;
          this.weatherData.location.countryName = location.country;
          this.weatherData.location.displayName = location.region;
          this.getWeatherById();
        });
      })
      .catch(() => {
        setLoadingToast(false);
        setToast(toastTxt.cityFail);
      });
  };

  public getPosition = () => {
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
        this.getSetting();
      });
  };

  public getRegion = (text: string) => {
    httpClient('getRegion', {
        region: encodeURI(text),
      })
      .then((res: any) => {
        runInAction(() => {
          if (!res.statesCode) {
            this.regionList = res.regionList;
          }
        });
      })
      .catch(() => {
        setToast(toastTxt.cityFail);
      });
  };

  public getLanguage = () => {
    this.showModal = false;
    Taro.getSystemInfo()
      .then(res => {
        this.systemLanguage = res.language;
        this.getPosition();
      })
      .catch(() => {
        setToast(toastTxt.languageFail);
      });
  };

  public getSetting = () => {
    Taro.getSetting().then(res => {
      if (!res.authSetting['scope.userLocation']) {
        this.showModal = true;
      } else {
        setToast(toastTxt.coordinatesFail);
      }
    });
  };
}

const weatherStore = new WeatherStore();

export default weatherStore;
