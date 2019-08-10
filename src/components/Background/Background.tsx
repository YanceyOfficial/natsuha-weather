import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Image, Block } from '@tarojs/components';
import { defaultPhotoUrl, toastTxt } from '../../constants/constants';
import { setToast } from '../../utils/toast';
import cs from 'classnames';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../types/weather';
import styles from './Background.module.scss';

@inject('weatherStore')
@observer
class Background extends Component<IWeatherProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  public onError = () => {
    setToast(toastTxt.imageFail);
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
          className={cs(styles.full_screen_background)}
          src={defaultPhotoUrl}
        />
        <Image
          className={cs(styles.full_screen_background)}
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
