import Taro from '@tarojs/taro'

/**
 * Package wx cloud request function
 *
 * @param {String} url The content of toast
 * @param {Object} data The params
 */
const httpClient = (url: string, data: any) =>
  new Promise((resolve, reject): void => {
    Taro.cloud
      .callFunction({
        name: url,
        data,
      })
      .then(res => {
        resolve(res.result)
      })
      .catch(e => {
        reject(e)
      })
  })

export default httpClient
