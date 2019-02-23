import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import styles from './SunAndMoon.module.scss';
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

interface SunAndMoon {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class SunAndMoon extends Component {
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
        <View className={styles.sun_moon_container}>
          <View className={styles.moon_parse}>
            <View className={styles.sun_icon_container}>
              <Image
                style="width: 20px;height: 20px;float: left; vertical-align: bottom"
                src="https://s.yimg.com/os/weather/1.0.1/moon/ic_moonphase_5@3x.png"
              />
            </View>
            <Text className={styles.moon_parse_name}>Waning Gibbous</Text>
          </View>
          <View className={styles.sun_graph}>
            <View className={styles.graph_container}>
              <View className={styles.sun_icon} />
              <View className={styles.during_container}>
                <View className={styles.during} />
              </View>
            </View>
            <View className={styles.sunrise_sunset_txt}>
              <Text className={styles.sunrise}>6:30 AM</Text>
              <Text className={styles.sunset}>5:43 PM</Text>
            </View>
          </View>
        </View>
        {/* content */}
      </View>
    );
  }
}

export default SunAndMoon as ComponentType;
