import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import styles from './Forecast.module.scss';
import { observer, inject } from '@tarojs/mobx';
import { IMeta, IWeather } from '../../types/weather';
import ForecastByHour from './ForecastByHour/ForecastByHour';
import ForecastByDay from './ForecastByDay/ForecastByDay';

type PageStateProps = {
  title: string;
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

interface Forecast {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class Forecast extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      title,
      weatherStore: { curSkyCode }
    } = this.props;

    return (
      <View className={styles.content_wrapper}>
        <Text className={styles.header}>{title}</Text>
        {/* content */}
        <View className={styles.forecast_container}>
          <ForecastByHour />
          <ForecastByDay />
        </View>
        {/* content */}
      </View>
    );
  }
}

export default Forecast as ComponentType;
