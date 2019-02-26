import Taro from '@tarojs/taro';
import {
  imageBaseUrl,
  imageType,
  hd,
} from '../constants/constants';

export const setToast = (title: string = '', icon: string = 'success', mask: boolean = false, duration: number = 1500) => {
  return Taro.showToast({
    title,
    icon,
    mask,
    duration,
  })
};

export const setLoadingToast = (title: string = 'Loading...', mask: boolean = false) => {
  return Taro.showLoading({
    title,
    mask,
  })
};

export const getSystemInfo = () => {
  const res = Taro.getSystemInfoSync();
  console.log(res.brand);
  console.log(res.model);
  console.log(res.system); // 可拿到系统版本 iOS 12.1.4
  console.log(res.screenWidth);
  console.log(res.screenHeight);
  console.log(res.pixelRatio);
  console.log(res.windowWidth);
  console.log(res.windowHeight);
  console.log(res.version); // 微信版本 7.0.3
  console.log(res.statusBarHeight);
  console.log(res.platform); // 可用于判断安卓还是iOS ios
  console.log(res.language); // 判断语言 zh-CN ja 注：这里的语言跟系统语言设置无关，因为微信在设置里可以自定义语言
  console.log(res.fontSizeSetting);
  console.log(res.SDKVersion);
};

export const formatJSONDate = jsonDate => new Date(+new Date(new Date(jsonDate).toJSON()) + 8 * 3600 * 1000).toISOString()
  .replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');

export const hourTo12 = date => {
  const oDate = new Date(date);
  const month = oDate.getUTCMonth() + 1;
  const day = oDate.getUTCDate();
  const hour = oDate.getUTCHours();
  const minute = oDate.getMinutes() < 10 ? `0${oDate.getMinutes()}` : oDate.getMinutes();
  if (hour > 12) {
    return `${month}/${day}, ${hour -12}:${minute} PM`;
  } else {
    return `${month}/${day}, ${hour}:${minute} AM`;
  }
}


export const upperFirstLetter = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index == 0 ? letter.toUpperCase() : letter.toLowerCase();
  }).replace(/\s+/g, '');
}

export const getImageUrl = (type: string, iconName: string, size = '60x60') => {
  return `${imageBaseUrl}/${imageType[type]}/${size}/${iconName}${hd}`
}
