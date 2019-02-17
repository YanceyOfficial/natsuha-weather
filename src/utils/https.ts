import Taro from '@tarojs/taro';
import {
  setToast,
} from './util';
import {
  baseUrl
} from '../constants/constants';

export const GET = (url: string, data: object | null, option: any) => {
  Taro.request({
      url: baseUrl + url,
      method: 'GET',
      data,
      header: option.header,
      dataType: option.dataType,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // todo
    });
}
