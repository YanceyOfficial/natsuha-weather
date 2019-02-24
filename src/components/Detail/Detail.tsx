import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import styles from './Detail.module.scss';
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

interface Detail {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class Detail extends Component {
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
        <View className={styles.detail_content_container}>
          <Image
            style="width: 70px;height: 70px; margin:35px;"
            src={`https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/${
              curSkyCode ? `${curSkyCode}` : 'clear_day'
            }@2x.png`}
          />
          <View className={styles.content_groups}>
            <View className={styles.content_group}>
              <Text>Feels like</Text>
              <Text>52°</Text>
            </View>
            <View className={styles.content_group}>
              <Text>Humidity</Text>
              <Text>14%</Text>
            </View>
            <View className={styles.content_group}>
              <Text>Visibility</Text>
              <Text>10.00 miles</Text>
            </View>
            <View className={styles.content_group}>
              <Text>UV Index</Text>
              <Text>1 (Low)</Text>
            </View>
          </View>
        </View>
        <View className={styles.content_detail}>
          <Text className={styles.content_detail_txt}>
            Today - Cloudy with a high of 54 °F (12.2 °C). Winds from E to SE.
          </Text>
          <Text className={styles.content_detail_txt}>
            Tonight - Cloudy. Winds variable. The overnight low will be 31 °F
            (-0.6 °C).
          </Text>
        </View>
        {/* content */}
      </View>
    );
  }
}

export default Detail as ComponentType;
