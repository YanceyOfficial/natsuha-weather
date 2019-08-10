import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Picker, Image, ScrollView } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../../types/weather';
import {
  getImageUrl,
  hourTo12Lite,
  getRainfallIconName,
} from '../../../utils/util';

import styles from './ForecastByHour.module.scss';
import arrow from '../../../assets/images/arrow.png';

interface IForecastByHourStates {
  typeList: string[];
  selected: string;
  scrollLength: number;
}

@inject('weatherStore')
@observer
class ForecastByHour extends Component<IWeatherProps, IForecastByHourStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      typeList: ['Temperature', 'Precipitation', 'Wind'],
      selected: 'Temperature',
      scrollLength: 0,
    };
  }

  public onSelectChange = (e: any) => {
    this.setState({
      selected: this.state.typeList[e.detail.value],
      scrollLength: 0,
    });
  };

  public onScroll = (e: any) => {
    this.setState({
      scrollLength: e.detail.scrollLeft,
    });
  };

  render() {
    const {
      weatherStore: {
        weatherData: {
          forecasts: { hourly },
        },
        metaData,
      },
    } = this.props;

    const { typeList, selected, scrollLength } = this.state;

    const hourlyList = hourly.map((hour, key) => (
      <View className={styles.precipitation_group} key={key}>
        <Text className={styles.precipitation_txt}>
          {hourTo12Lite(hour.observationTime.hour)}
        </Text>
        {selected === 'Temperature' ? (
          <Image
            className={styles.icon}
            src={getImageUrl(
              'Temperature',
              metaData.skycode[hour.conditionCode],
            )}
          />
        ) : null}

        {selected === 'Precipitation' ? (
          <Image
            className={styles.icon}
            src={getImageUrl(
              'Precipitation',
              getRainfallIconName(hour.precipitationProbability),
            )}
          />
        ) : null}

        {selected === 'Wind' ? (
          <Image
            className={styles.icon}
            src={arrow}
            style={{ transform: `rotate(${hour.windDirection}deg)` }}
          />
        ) : null}

        {selected === 'Temperature' ? (
          <Text>{hour.temperature.now.toFixed(0)}°</Text>
        ) : null}

        {selected === 'Precipitation' ? (
          <Text>{hour.precipitationProbability}%</Text>
        ) : null}

        {selected === 'Wind' ? <Text>{hour.windSpeed}</Text> : null}
      </View>
    ));

    return (
      <View className={styles.forecast_hour_container}>
        <View className={styles.mask} />
        <Picker
          mode='selector'
          range={typeList}
          value={0}
          onChange={e => this.onSelectChange(e)}
        >
          <View className={styles.picker}>
            {selected}
            <View className={styles.arrow} />
          </View>
        </Picker>
        <ScrollView
          scrollX={true}
          scrollLeft={scrollLength}
          onScroll={e => this.onScroll(e)}
          className={styles.precipitation_contaienr}
        >
          {hourlyList}
        </ScrollView>
      </View>
    );
  }
}

export default ForecastByHour as ComponentType;
