import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import cs from 'classnames';
import { IWeatherProps } from '../../types/weather';
import { hourTo12, getImageUrl } from '../../utils/util';
const flickr = require('../../assets/images/flickr.png');
const arrow = require('../../assets/images/arrow.png');
const location_yellow = require('../../assets/images/location_yellow.png');
const styles = require('./Summary.module.scss');

@inject('weatherStore')
@observer
class Summary extends Component<IWeatherProps, {}> {
  render() {
    const {
      weatherStore: {
        weatherData,
        handleTemperatureTypeChange,
        showSearchDialog,
        isFahrenheit,
        metaData,
        curCityName,
        curCountryName,
      },
    } = this.props;

    const ownerName =
      weatherData.photos[0].resolutions.length !== 0
        ? weatherData.photos[0].ownerName
        : 'Yancey';

    return (
      <View className={styles.summary_wrapper}>
        <View className={styles.region_summary}>
          <View className={styles.header}>
            <Text className={styles.city}>{curCityName}</Text>
            <Image
              className={styles.location_icon}
              src={location_yellow}
              onClick={() => showSearchDialog()}
            />
          </View>
          <Text className={styles.country}>{curCountryName}</Text>
          <Text className={styles.cur_time}>
            {hourTo12(weatherData.observation.localTime.timestamp)}
          </Text>
        </View>

        <View className={styles.cur_temperature_summary}>
          <View className={styles.condition_summary}>
            <Image
              className={styles.condition_icon}
              src={getImageUrl(
                'Temperature',
                metaData.skycode[weatherData.observation.conditionCode],
              )}
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
              {weatherData.observation.temperature.high.toFixed(0)}°
            </Text>
            <Image className={styles.arrow} src={arrow} />
            <Text className={styles.temperature}>
              {weatherData.observation.temperature.low.toFixed(0)}°
            </Text>
          </View>

          <View>
            <Text className={styles.cur_temperature}>
              {weatherData.observation.temperature.now.toFixed(0)}
            </Text>
            <Text className={styles.cur_temperature_symbol}>°</Text>
            <View className={styles.temperature_type}>
              <Button
                className={cs(
                  styles.temperature_type_btn,
                  !isFahrenheit ? styles.is_not_f : '',
                )}
                disabled={isFahrenheit}
                onClick={() => handleTemperatureTypeChange(true)}
              >
                F
              </Button>
              <Button
                className={cs(
                  styles.temperature_type_btn,
                  isFahrenheit ? styles.is_not_f : '',
                )}
                disabled={!isFahrenheit}
                onClick={() => handleTemperatureTypeChange(false)}
              >
                C
              </Button>
            </View>
          </View>
          <View className={styles.flickr_info}>
            <Text className={styles.flickr_txt}>© by{' '}</Text>
            <Text className={styles.flickr_txt}>{ownerName}</Text>
            <Text className={styles.flickr_txt}>{' '}on{' '}</Text>
            <Image className={styles.flickr_icon} src={flickr} />
          </View>
        </View>
      </View>
    );
  }
}

export default Summary as ComponentType;
