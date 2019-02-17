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
