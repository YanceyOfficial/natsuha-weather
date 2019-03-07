import Taro from '@tarojs/taro'
import {
  imageBaseUrl,
  imageType,
  hd2,
  hd3,
  weekList,
} from '../constants/constants'

/**
 * Package the common toast component
 *
 * @param {String} title The content of toast
 * @param {String} icon The icon of toast
 * @param {Boolean} mask Show or hide a mask
 * @param {Number} duration The display duration of toast
 * @returns {Any} Returns to show a toast
 */
export const setToast = (title: string = '', icon: string = 'none', mask: boolean = true, duration: number = 1500): any => {
  return Taro.showToast({
    title,
    icon,
    mask,
    duration,
  })
}

/**
 * Package the loading toast component
 *
 * @param {Boolean} showLoadingToast Show or hide a toast
 * @param {String} title The content of toast
 * @param {Boolean} mask Show or hide a mask
 * @returns {Any} Returns to show or hide a loading toast
 */
export const setLoadingToast = (showLoadingToast: boolean, title: string = 'Loading...', mask: boolean = true): void | any => {
  if (showLoadingToast) {
    return Taro.showLoading({
      title,
      mask,
    })
  } else {
    Taro.hideLoading();
  }
}

/**
 * Format a JSON date
 *
 * @param {String} title JSON date string
 * @returns {String} Returns the formatted date string.
 */
export const formatJSONDate = (jsonDate: string): string =>
  new Date(+new Date(new Date(jsonDate).toJSON()) + 8 * 3600 * 1000).toISOString()
  .replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

/**
 * Format UTC date
 *
 * @param {String} title JSON date string
 * @returns {String} Returns the formatted UTC date string.
 */
export const hourTo12 = (date: string): string => {
  const oDate = new Date(date)
  const month = oDate.getUTCMonth() + 1
  const day = oDate.getUTCDate()
  const hour = oDate.getUTCHours()
  const minute = oDate.getMinutes() < 10 ? `0${oDate.getMinutes()}` : oDate.getMinutes()
  if (hour > 12) {
    return `${month}/${day}, ${hour -12}:${minute} PM`
  } else {
    return `${month}/${day}, ${hour}:${minute} AM`
  }
}

/**
 * Format time
 *
 * @param {String} title Timestamp
 * @returns {String} Returns the formatted time string.
 */
export const hourTo12Lite = (hour: number) => {
  if (hour > 12) {
    return `${hour -12} PM`
  } else {
    return `${hour} AM`
  }
}

/**
 * Capitalize the first letter of words in a string
 *
 * @param {String} number Current wind speed amount
 * @returns {String} Returns the first letter capitalize string.
 */
export const upperFirstLetter = (str: string): string => {
  if (str.includes('_')) {
    str = str.split('_').join(' ')
  }
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

/**
 * Capitalize the first letter of words in a string
 *
 * @param {String} type Temperature or Precipitation or Moonphase
 * @param {String | Number} iconName The icon name
 * @returns {String} Returns full url of icon.
 */
export const getImageUrl = (type: string, iconName: string | number): string => {
  const base = `${imageBaseUrl}/${imageType[type]}`;
  if (type === 'Temperature') {
    return `${base}/60x60/${iconName}${hd2}`;
  } else if (type === 'Precipitation') {
    return `${base}/54x60/rain_ico_${iconName}${hd2}`;
  } else {
    return `${base}/ic_moonphase_${iconName}${hd3}`;
  }
}

/**
 * Simulate the speed of anemometer by current wind speed.
 *
 * @param {Number} number Current wind speed amount
 * @returns {Number} Returns the rainfall icon Name.
 */
export const getRainfallIconName = (number: number): number => parseInt((number / 10).toString(), 10) * 10

/**
 * Extract the first letter of each word in the string.
 *
 * @param {String} value Current wind speed amount
 * @returns {String} Returns a new string with the first letter of each word in the string.
 */
export const windDirectFormat = (value: string): string => {
  const arr = value.match(/\b(\w)/g);
  if (arr) {
    if (arr.length > 1) {
      return arr.join('')
    } else {
      return value
    }
  }
  return value;
}

/**
 * Simulate the speed of anemometer by current wind speed.
 *
 * @param {Number} windSpeed Current wind speed amount
 * @returns {Number} Returns the time required to make one rotation.
 */
export const getWindSpeed = (windSpeed: number): number => {
  const windSpeedKey = parseInt((windSpeed / 5).toString(), 10);
  let result = 3.5625;
  switch (true) {
    case windSpeedKey === 0:
      result = 3.5625;
      break;
    case windSpeedKey === 1:
      result = result - 0.4375;
      break;
    case windSpeedKey === 2:
      result = result - 0.4375 * 2;
      break;
    case windSpeedKey === 3:
      result = result - 0.4375 * 3;
      break;
    case windSpeedKey > 3:
      result = result - 0.4375 * 4;
      break;
    default:
      result = 3.5625;
  }
  return result;
}

/**
 * Format timestamp with 12-hour system.
 *
 * @param {Number} timestamp A timestamp
 * @returns {String} Returns the time of 12-hour system.
 */
export const formatSunRiseAndSetDate = (timestamp: number): string => {
  let minute = '';
  const hour = new Date(timestamp * 1000).getUTCHours() % 12 || 12;
  const _minute = new Date(timestamp * 1000).getUTCMinutes();
  if (_minute < 10) {
    minute = `0${_minute}`;
  } else {
    minute = _minute.toString();
  }
  return `${hour}:${minute}`;
}

/**
 * Compute the offset amount of sun's position or light area.
 *
 * @param {String} type Light Area or position of the sun
 * @param {Number} sunrise An UTC timestamp of sunrise
 * @param {Number} sunset An UTC timestamp of sunset
 * @returns {String} Returns the offset amount.
 */
export const sunPosition = (type: string, sunrise: number, sunset: number): string | number => {
  const oDate = new Date();
  const now = oDate.getHours() * 60 * 60 + oDate.getMinutes() * 60;
  const proportion = (now - sunrise) / (sunset - sunrise);
  if (proportion < 0.1 || proportion > 0.9) {
    return 0;
  } else {
    if (type === 'sun') {
      return (proportion * 150 + 15).toFixed(0);
    } else {
      return (proportion * 160).toFixed(0);
    }
  }
}

/**
 * Get the name of weekday by week code in the related api.
 *
 * @param {Number} weekNum An UTC timestamp of sunset
 * @returns {String} Returns the name of weekday.
 */
export const formatWeek = (weekNum: number): string => weekList[weekNum];

/**
 * Package wx cloud request function
 *
 * @param {String} title The content of toast
 * @param {String} icon The icon of toast
 * @param {Boolean} mask Show or hide a mask
 * @param {Number} duration The display duration of toast
 * @returns {Any} Returns to show a toast
 */
export const httpClient = (url: string, data: any) => new Promise((resolve, reject) => {
  wx.cloud.callFunction({
    name: url,
    data,
  }).then(res => {
    resolve(res.result);
  }).catch(e => {
    reject(e)
  });
});
