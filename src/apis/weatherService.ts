import {
  GET
} from '../utils/https';
import {
  mobileType
} from '../constants/constants';

class WeatherService {
  public getWeatherById(woeids: string = '2151849', language: string = 'en-US') {
    return GET(`;woeids=${woeids}?lang=${language}&${mobileType}`, null, '');
  }
}


const weatherService = new WeatherService();

export default weatherService;
