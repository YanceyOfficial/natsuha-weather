import Taro from '@tarojs/taro'
import {
  imageBaseUrl,
  imageType,
  hd,
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

export const getImageUrl = (type: string, iconName: string | number, size = '60x60') => {
  return `${imageBaseUrl}/${imageType[type]}/${size}/${iconName}${hd}`
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
      result = 3.125;
      break;
    case windSpeedKey === 2:
      result = 2.6875;
      break;
    case windSpeedKey === 3:
      result = 2.25;
      break;
    case windSpeedKey > 3:
      result = 1.8125;
      break;
    default:
      result = 3.5625;
  }
  return result;
}
