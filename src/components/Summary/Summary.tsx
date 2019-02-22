import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import styles from './Summary.module.scss';
import { observer, inject } from '@tarojs/mobx';
import { IMeta, IWeather } from '../../types/weather';
import { hourTo12 } from '../../utils/util';
import { defaultPhotoUrl } from '../../constants/constants';

type PageStateProps = {
  weatherStore: {
    weatherData: IWeather;
    metaData: IMeta;
    curSkyCode: string;
    getWeatherById: Function;
    getRegion: Function;
    getPosition: Function;
    getWoeid: Function;
  };
};

interface Summary {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class Summary extends Component {
  componentWillMount() {}

  componentDidMount() {
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      weatherStore: { weatherData, curSkyCode }
    } = this.props;

    const photoUrl = weatherData.photos
      ? weatherData.photos[0].resolutions[5].url
      : defaultPhotoUrl;

    const timestamp = weatherData.observation ? weatherData.observation.localTime.timestamp : new Date().toJSON();

    return (
      <View
        className={styles.summary_wrapper}
        style={{
          backgroundImage: `url(${photoUrl})`
        }}
      >
        <View className={styles.region_summary}>
          <Text className={styles.city}>
            {weatherData.location.displayName}
          </Text>
          <Text className={styles.country}>
            {weatherData.location.countryName}
          </Text>
          <Text className={styles.cur_time}>
            {hourTo12(timestamp)}
          </Text>
        </View>
        <View className={styles.cur_temperature_summary}>
          <View className={styles.condition_summary}>
            <Image
              style="width: 32px;height: 32px"
              src={`https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/${
                curSkyCode ? curSkyCode : 'clear_day'
              }@2x.png`}
            />
            <Text className={styles.condition_txt}>
              {weatherData.observation.conditionDescription}
            </Text>
          </View>
          <View className={styles.high_low_temperature}>
            <Text className={styles.arrow} />
            <Text className={styles.temperature}>
              {weatherData.observation.temperature.high}°
            </Text>
            <Text className={styles.arrow} />
            <Text className={styles.temperature}>
              {weatherData.observation.temperature.low}°
            </Text>
          </View>
          <View>
            <Text className={styles.cur_temperature}>
              {weatherData.observation.temperature.now}°
            </Text>
            {/* <Text>F</Text>
            <Text>C</Text> */}
          </View>
          <View className={styles.flickr_info}>
            <Text className={styles.flickr_txt}>
              © by {weatherData.photos[0].ownerName}{' '}on{' '}
            </Text>
            <Image
              style="width: 32px;height: 10px"
              src="https://s.yimg.com/os/weather/1.0.1/flickr/logo@3x.png"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default Summary as ComponentType;
