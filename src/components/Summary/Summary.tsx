import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import cs from 'classnames';
import { IWeatherProps } from '../../types/weather';
import { hourTo12, getImageUrl } from '../../utils/util';
const flickr = require('../../assets/images/flickr.png');
const arrow = require('../../assets/images/arrow.png');
const styles = require('./Summary.module.scss');

@inject('weatherStore')
@observer
class Summary extends Component<IWeatherProps, {}> {
  render() {
    const {
      weatherStore: { weatherData, curSkyCode, handleTemperatureType, isF }
    } = this.props;

    const ownerName =
      weatherData.photos[0].resolutions.length !== 0
        ? weatherData.photos[0].ownerName
        : 'Yancey';

    return (
      <View className={styles.summary_wrapper}>
        <View className={styles.region_summary}>
          <Text className={styles.city}>
            {weatherData.location.displayName}
          </Text>
          <Text className={styles.country}>
            {weatherData.location.countryName}
          </Text>
          <Text className={styles.cur_time}>
            {hourTo12(weatherData.observation.localTime.timestamp)}
          </Text>
        </View>

        <View className={styles.cur_temperature_summary}>
          <View className={styles.condition_summary}>
            <Image
              className={styles.condition_icon}
              src={getImageUrl('Temperature', curSkyCode)}
            />
            <Text className={styles.condition_txt}>
              {weatherData.observation.conditionDescription}
            </Text>
          </View>

          <View className={styles.high_low_temperature}>
            <Image
              className={cs(styles.arrow, styles.arrow_reverse)}
              src={arrow}
            />
            <Text className={styles.temperature}>
              {weatherData.observation.temperature.high}°
            </Text>
            <Image className={styles.arrow} src={arrow} />
            <Text className={styles.temperature}>
              {weatherData.observation.temperature.low}°
            </Text>
          </View>

          <View>
            <Text className={styles.cur_temperature}>
              {weatherData.observation.temperature.now}°
            </Text>
            <View className={styles.temperature_type}>
              <View
                className={cs(styles.temperature_type_btn, !isF ? styles.is_f : '')}
                onClick={() => handleTemperatureType(true)}
              >
                F
              </View>
              <View
                className={cs(styles.temperature_type_btn, isF ? styles.is_f : '')}
                onClick={() => handleTemperatureType(false)}
              >
                C
              </View>
            </View>
          </View>
          <View className={styles.flickr_info}>
            <Text className={styles.flickr_txt}>
              © by {ownerName}{' '}on{' '}
            </Text>
            <Image className={styles.flickr_icon} src={flickr} />
          </View>
        </View>
      </View>
    );
  }
}

export default Summary as ComponentType;
