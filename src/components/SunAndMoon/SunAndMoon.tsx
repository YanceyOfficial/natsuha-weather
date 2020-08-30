import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { WeatherProps } from '../../types/weather'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import {
  formatSunRiseAndSetDate,
  getImageUrl,
  sunPosition,
} from '../../utils/util'
import { moonPhases } from '../../constants/constants'
import styles from './SunAndMoon.module.scss'

@inject('weatherStore')
@observer
class SunAndMoon extends Component<WeatherProps, {}> {
  render() {
    const {
      weatherStore: {
        weatherData: {
          sunAndMoon: { sunrise, sunset, moonPhase },
        },
      },
    } = this.props

    const sunIconPosition = sunPosition('sun', sunrise, sunset)
    const illuminationPosition = sunPosition('illumination', sunrise, sunset)

    const sunIconStyle = {
      transform: `rotate(${sunIconPosition}deg)`,
      display: `${sunIconPosition === 0 ? 'none' : 'block'}`,
    }

    const illuminationStyle = {
      width: `${illuminationPosition}px`,
    }

    return (
      <ContentWrapper title='Sun & Moon'>
        <View className={styles.sun_moon_container}>
          <View className={styles.moon_parse}>
            <View className={styles.sun_icon_container}>
              <Image
                className={styles.icon}
                src={getImageUrl('Moon', moonPhase)}
              />
            </View>
            <Text className={styles.moon_parse_name}>
              {moonPhases[moonPhase]}
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
                {formatSunRiseAndSetDate(sunrise)} AM
              </Text>
              <Text className={styles.sunset}>
                {formatSunRiseAndSetDate(sunset)} PM
              </Text>
            </View>
          </View>
        </View>
      </ContentWrapper>
    )
  }
}

export default SunAndMoon as ComponentType
