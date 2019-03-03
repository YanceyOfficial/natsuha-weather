import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, Block } from '@tarojs/components';
import { defaultPhotoUrl } from '../../constants/constants';
import { setToast } from '../../utils/util';
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
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }
  public onError = () => {
    setToast('图片加载失败', 'none');
    this.props.weatherStore.backgroudImageUrl = defaultPhotoUrl;
  };

  render() {
    const {
      weatherStore: { backgroudImageUrl },
      needBlur,
    } = this.props;
    return (
      <Block>
        <Image
          className={cs(
            styles.full_screen_background,
          )}
          src={backgroudImageUrl}
          onError={() => this.onError()}
        />
        <Image
          className={cs(
            styles.full_screen_background,
            needBlur ? styles.background_blur : '',
          )}
          src={backgroudImageUrl}
        />
      </Block>
    );
  }
}

export default Background as ComponentType;
