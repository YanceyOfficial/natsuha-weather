const defaultImage = require('../assets/images/defaultImage.jpg');

export const moonPhases = {
  0: 'New Moon', // 新月、朔
  1: 'Waxing Crescent', // 眉月
  2: 'First Quarter', // 上弦月
  3: 'Waxing Gibbous', // 盈凸月
  4: 'Full Moon', // 滿月、望
  5: 'Waning Gibbous', // 虧凸月
  6: 'Last Quarter', // 下弦月 (Third Quarter)
  7: 'Waning Crescent', // 虧眉月
}



export const defaultPhotoUrl = defaultImage;

export const imageBaseUrl = 'https://s.yimg.com/os/weather/1.0.1';

export const imageType = {
  Temperature: 'shadow_icon',
  Precipitation: 'precipitation',
  Moon: 'moon',
}

export const hd2 = '@2x.png';
export const hd3 = '@3x.png';

export const weekList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
