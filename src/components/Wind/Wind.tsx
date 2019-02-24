import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import cs from 'classnames';
import styles from './Wind.module.scss';
import { observer, inject } from '@tarojs/mobx';
import { IMeta, IWeather } from '../../types/weather';

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

interface Wind {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class Wind extends Component {
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
        <View className={styles.wind_container}>
          <View className={styles.wind_main}>
            <View className={styles.wind_graph_group}>
              <View className={styles.wind_graph}>
                <View className={styles.graph_fan} />
                <View className={styles.graph_pole} />
              </View>
              <View className={cs(styles.wind_graph, styles.wind_graph_small)}>
                <View className={styles.graph_fan} />
                <View className={styles.graph_pole} />
              </View>
            </View>

            <View className={styles.wind_info}>
              <Text className={styles.wind_txt}>Wind</Text>
              <Text className={styles.wind_txt}>6 mph SSW</Text>
            </View>

            <View className={styles.barometric_pressure}>
              <Text className={styles.wind_txt}>Barometer</Text>
              <Text className={styles.wind_txt}>30.1 inches</Text>
            </View>
          </View>
          <View className={styles.split} />
        </View>
        {/* content */}
      </View>
    );
  }
}

export default Wind as ComponentType;
