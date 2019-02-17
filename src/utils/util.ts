import Taro from '@tarojs/taro';

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
