import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../types/weather';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import { sunRiseSet, getImageUrl, sunPosition } from '../../utils/util';
import { moonPhase } from '../../constants/constants';
const styles = require('./SunAndMoon.module.scss');

@inject('weatherStore')
@observer
class SunAndMoon extends Component<IWeatherProps, {}> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      weatherStore: { weatherData }
    } = this.props;

    const sunIconStyle = {
      transform: `rotate(${sunPosition(
        weatherData.sunAndMoon.sunrise,
        weatherData.sunAndMoon.sunset,
        170,
      )}deg)`
    };

    const illuminationStyle = {
      width: `${sunPosition(
        weatherData.sunAndMoon.sunrise,
        weatherData.sunAndMoon.sunset,
        180,
      )}px`
    };

    return (
      <ContentWrapper title="Sun & Moon">
        <View className={styles.sun_moon_container}>
          <View className={styles.moon_parse}>
            <View className={styles.sun_icon_container}>
              <Image
                className={styles.icon}
                src={getImageUrl('Moon', weatherData.sunAndMoon.moonPhase)}
              />
            </View>
            <Text className={styles.moon_parse_name}>
              {moonPhase[weatherData.sunAndMoon.moonPhase]}
            </Text>
          </View>
          <View className={styles.sun_graph}>
            <View className={styles.graph_container}>
              <View className={styles.sun_icon} style={sunIconStyle} />
              <View
                className={styles.during_container}
                style={illuminationStyle}
              >
                <View className={styles.during} />
              </View>
            </View>
            <View className={styles.sunrise_sunset_txt}>
              <Text className={styles.sunrise}>
                {sunRiseSet(weatherData.sunAndMoon.sunrise)}{' '}AM
              </Text>
              <Text className={styles.sunset}>
                {sunRiseSet(weatherData.sunAndMoon.sunset)}{' '}PM
              </Text>
            </View>
          </View>
        </View>
      </ContentWrapper>
    );
  }
}

export default SunAndMoon as ComponentType;
