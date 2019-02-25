import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import styles from './ForecastByHour.module.scss';
import { observer, inject } from '@tarojs/mobx';
import { IMeta, IWeather } from '../../../types/weather';

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

interface ForecastByHour {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class ForecastByHour extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      numbers: [...Array(25).keys()]
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      weatherStore: { curSkyCode }
    } = this.props;

    const { numbers } = this.state;

    const value = numbers.map(number => (
      <View>
        <Text>caoni</Text>
      </View>
    ));

    return (
      <View className={styles.forecast_hour_container}>
        <Block>{value}</Block>
      </View>
    );
  }
}

export default ForecastByHour as ComponentType;
