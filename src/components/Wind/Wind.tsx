import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import cs from 'classnames';
import styles from './Wind.module.scss';
import { observer, inject } from '@tarojs/mobx';
import { IMeta, IWeather } from '../../types/weather';
import ContentWrapper from '../ContentWrapper/ContentWrapper';

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
      weatherStore: { curSkyCode }
    } = this.props;

    return (
      <ContentWrapper title="Wind & Pressure">
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
      </ContentWrapper>
    );
  }
}

export default Wind as ComponentType;
