import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import styles from './Precipitation.module.scss';
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

interface Precipitation {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class Precipitation extends Component {
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
      <ContentWrapper title="Precipitation">
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
      </ContentWrapper>
    );
  }
}

export default Precipitation as ComponentType;
