import Taro from '@tarojs/taro'

/**
 * Package the common toast component
 *
 * @param {String} title The content of toast
 * @param {String} icon The icon of toast
 * @param {Boolean} mask Show or hide a mask
 * @param {Number} duration The display duration of toast
 * @returns {Any} Returns to show a toast
 */
export const setToast = (
  title: string = '',
  icon: string = 'none',
  mask: boolean = true,
  duration: number = 1500,
): any => {
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
export const setLoadingToast = (
  showLoadingToast: boolean,
  title: string = 'Loading...',
  mask: boolean = true,
): void | any => {
  if (showLoadingToast) {
    return Taro.showLoading({
      title,
      mask,
    })
  } else {
    Taro.hideLoading()
  }
}
