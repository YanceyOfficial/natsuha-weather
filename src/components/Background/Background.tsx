import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import cs from 'classnames';
import { IWeather } from '../../types/weather';
import { defaultPhotoUrl } from '../../constants/constants';
const styles = require('./Background.module.scss');

interface IBackgroundProps {
  needBlur: boolean;
  weatherStore: {
    weatherData: IWeather;
  };
}

@inject('weatherStore')
@observer
class Background extends Component<IBackgroundProps, {}> {
  render() {
    const {
      weatherStore: { weatherData },
      needBlur
    } = this.props;
    const photoUrl = weatherData.photos
      ? weatherData.photos[0].resolutions[5].url
      : defaultPhotoUrl;
    return (
      <View
        className={cs(
          styles.background,
          needBlur ? styles.background_blur : ''
        )}
        style={{ backgroundImage: `url(${photoUrl})` }}
      />
    );
  }
}

export default Background as ComponentType;
