import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image } from '@tarojs/components';
import cs from 'classnames';
import { observer, inject } from '@tarojs/mobx';
import { IWeather } from '../../types/weather';
const styles = require('./Background.module.scss');

interface IBackgroundProps {
  needBlur: boolean;
  weatherStore: {
    weatherData: IWeather;
    backgroudImageUrl: string;
  };
}

@inject('weatherStore')
@observer
class Background extends Component<IBackgroundProps, {}> {
  public onError = () => {
    console.log('图片加载失败！');
  };

  render() {
    const {
      weatherStore: { backgroudImageUrl },
      needBlur
    } = this.props;
    return (
      <Image
        className={cs(
          styles.full_screen_background,
          needBlur ? styles.background_blur : ''
        )}
        src={backgroudImageUrl}
        onError={() => this.onError()}
      />
    );
  }
}

export default Background as ComponentType;
