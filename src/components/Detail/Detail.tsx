import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../types/weather';
import { upperFirstLetter, getImageUrl } from '../../utils/util';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
const styles = require('./Detail.module.scss');

@inject('weatherStore')
@observer
class Detail extends Component<IWeatherProps, {}> {
  render() {
    const {
      weatherStore: {
        curSkyCode,
        weatherData: {
          observation: {
            temperature,
            visibility,
            uvIndex,
            uvDescription,
            dayPartTexts,
            humidity
          }
        },
        renderTrigger,
        updateKey,
        isF
      }
    } = this.props;

    renderTrigger(updateKey);

    const dayPartTextList = dayPartTexts.map((value, key) => (
      <Text className={styles.content_detail_txt} key={key}>
        {upperFirstLetter(value.dayPart)}{' '}-{' '}{value.text}
      </Text>
    ));

    return (
      <ContentWrapper title="Details">
        <View className={styles.detail_content_container}>
          <Image
            className={styles.icon}
            src={getImageUrl('Temperature', curSkyCode)}
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
                {visibility.toFixed(2)}{' '}{isF ? 'miles' : 'km'}
              </Text>
            </View>
            <View className={styles.content_group}>
              <Text>UV Index</Text>
              <Text>
                {uvIndex}{' '}({uvDescription})
              </Text>
            </View>
          </View>
        </View>
        <View className={styles.content_detail}>{dayPartTextList}</View>
      </ContentWrapper>
    );
  }
}

export default Detail as ComponentType;
