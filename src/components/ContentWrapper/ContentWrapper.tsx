import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import styles from './ContentWrapper.module.scss';
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

interface ContentWrapper {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class ContentWrapper extends Component {
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
        <View className={styles.precipitation_container}>
          <View className={styles.precipitation_group}>
            <Text>Afternoon</Text>
            <Image
              style="display: block; width: 27px;height: 27px; margin: 5px 0"
              src={`https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_0@2x.png`}
            />
            <Text>0%</Text>
          </View>
          <View className={styles.precipitation_group}>
            <Text>Afternoon</Text>
            <Image
              style="display: block; width: 27px;height: 27px; margin: 5px 0"
              src={`https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_0@2x.png`}
            />
            <Text>0%</Text>
          </View>
          <View className={styles.precipitation_group}>
            <Text>Afternoon</Text>
            <Image
              style="display: block; width: 27px;height: 27px; margin: 5px 0"
              src={`https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_0@2x.png`}
            />
            <Text>0%</Text>
          </View>
          <View className={styles.precipitation_group}>
            <Text>Afternoon</Text>
            <Image
              style="display: block; width: 27px;height: 27px; margin: 5px 0"
              src={`https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_0@2x.png`}
            />
            <Text>0%</Text>
          </View>
        </View>
        {/* content */}
      </View>
    );
  }
}

export default ContentWrapper as ComponentType;
