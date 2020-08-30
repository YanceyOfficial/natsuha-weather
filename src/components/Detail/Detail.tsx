import { ComponentType } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { WeatherProps } from '../../types/weather'
import { upperFirstLetter, getImageUrl } from '../../utils/util'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import styles from './Detail.module.scss'

@inject('weatherStore')
@observer
class Detail extends Component<WeatherProps, {}> {
  render() {
    const {
      weatherStore: {
        weatherData: {
          observation: {
            conditionCode,
            temperature,
            visibility,
            uvIndex,
            uvDescription,
            dayPartTexts,
            humidity,
          },
        },
        isFahrenheit,
        metaData,
      },
    } = this.props

    const dayPartTextList = dayPartTexts.map(value => (
      <Text className={styles.content_detail_txt} key={value.dayPart}>
        {upperFirstLetter(value.dayPart)} - {value.text}
      </Text>
    ))

    return (
      <ContentWrapper title='Details'>
        <View className={styles.detail_content_container}>
          <Image
            className={styles.icon}
            src={getImageUrl('Temperature', metaData.skycode[conditionCode])}
          />
          <View className={styles.content_groups}>
            <View className={styles.content_group}>
              <Text>Feels like</Text>
              <Text>{temperature.feelsLike.toFixed(0)}°</Text>
            </View>
            <View className={styles.content_group}>
              <Text>Humidity</Text>
              <Text>{humidity}%</Text>
            </View>
            <View className={styles.content_group}>
              <Text>Visibility</Text>
              <Text>
                {visibility.toFixed(2)} {isFahrenheit ? 'miles' : 'km'}
              </Text>
            </View>
            <View className={styles.content_group}>
              <Text>UV Index</Text>
              <Text>
                {uvIndex} ({uvDescription})
              </Text>
            </View>
          </View>
        </View>
        <View className={styles.content_detail}>{dayPartTextList}</View>
      </ContentWrapper>
    )
  }
}

export default Detail as ComponentType
