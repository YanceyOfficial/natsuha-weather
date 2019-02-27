import Taro from '@tarojs/taro'
import {
  imageBaseUrl,
  imageType,
  hd2,
  hd3,
} from '../constants/constants'

export const setToast = (title: string = '', icon: string = 'success', mask: boolean = false, duration: number = 1500) => {
  return Taro.showToast({
    title,
    icon,
    mask,
    duration,
  })
}

export const setLoadingToast = (title: string = 'Loading...', mask: boolean = false) => {
  return Taro.showLoading({
    title,
    mask,
  })
}

export const getSystemInfo = () => {
  const res = Taro.getSystemInfoSync()
  console.log(res.brand)
  console.log(res.model)
  console.log(res.system) // 可拿到系统版本 iOS 12.1.4
  console.log(res.screenWidth)
  console.log(res.screenHeight)
  console.log(res.pixelRatio)
  console.log(res.windowWidth)
  console.log(res.windowHeight)
  console.log(res.version) // 微信版本 7.0.3
  console.log(res.statusBarHeight)
  console.log(res.platform) // 可用于判断安卓还是iOS ios
  console.log(res.language) // 判断语言 zh-CN ja 注：这里的语言跟系统语言设置无关，因为微信在设置里可以自定义语言
  console.log(res.fontSizeSetting)
  console.log(res.SDKVersion)
}

export const formatJSONDate = jsonDate => new Date(+new Date(new Date(jsonDate).toJSON()) + 8 * 3600 * 1000).toISOString()
  .replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

export const hourTo12 = date => {
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


export const upperFirstLetter = (str: string) => {
  if (str.includes('_')) {
    str = str.split('_').join(' ')
  }
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

export const getImageUrl = (type: string, iconName: string | number) => {
  const base = `${imageBaseUrl}/${imageType[type]}`;
  if (type === 'Temperature') {
    return `${base}/60x60/${iconName}${hd2}`;
  } else if (type === 'Precipitation') {
    return `${base}/54x60/rain_ico_${iconName}${hd2}`;
  } else {
    return `${base}/ic_moonphase_${iconName}${hd3}`;
  }
}

export const getRainfallIconName = (value: number) => parseInt((value / 10).toString(), 10) * 10

export const windDirectFormat = (value: string) => {
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

export const getWindSpeed = (windSpeed: number) => {
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

export const sunRiseSet = (value: number) => {
  let minute = '';
  const hour = new Date(value * 1000).getUTCHours() % 12 || 12;
  const _minute = new Date(value * 1000).getUTCMinutes();
  if (_minute < 10) {
    minute = `0${_minute}`;
  } else {
    minute = _minute.toString();
  }
  return `${hour}:${minute}`;
}

export const sunPosition = (sunrise: number, sunset: number, base: number) => {
  const oDate = new Date();
  const now = oDate.getHours() * 60 * 60 + oDate.getMinutes() * 60;
  const result = (now - sunrise) / (sunset - sunrise);
  if (result < 0 || result > 1) {
    return 0;
  } else {
    return (result * base).toFixed(0);
  }
}
