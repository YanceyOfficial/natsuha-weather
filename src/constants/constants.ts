export const weatherAPI = (woeids: string, language = 'en-US') => `${baseUrl};woeids=${woeids}?lang=${language}&${mobileType}`;

export const regionAPI = (text: string) => `${baseUrl};text=${text}`;

export const baseUrl = 'https://www.yahoo.com/news/_tdnews/api/resource/WeatherService';

export const mobileType = 'feature=caasSmartphone';

export const moonPhase = {
  0: 'New Moon', // 新月、朔
  1: 'waxing crescent', // 眉月
  2: 'First Quarter', // 上弦月
  3: 'Waxing Gibbous', // 盈凸月
  4: 'Full Moon', // 滿月、望
  5: 'Waning Gibbous', // 虧凸月
  6: 'Last Quarter', // 下弦月
  7: 'Waning Crescent', // 虧眉月
}
