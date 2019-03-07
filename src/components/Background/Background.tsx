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

interface IBackgroundStates {
  loaded: boolean;
}

@inject('weatherStore')
@observer
class Background extends Component<IBackgroundProps, IBackgroundStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  public onError = () => {
    setToast('画像のロードに失敗しました');
    this.props.weatherStore.backgroudImageUrl = defaultPhotoUrl;
  };

  public onLoad = () => {
    if (!this.state.loaded) {
      this.setState({
        loaded: true,
      });
    }
  };

  render() {
    const {
      weatherStore: { backgroudImageUrl },
      needBlur,
    } = this.props;

    const { loaded } = this.state;

    return (
      <Block>
        <Image
          className={cs(
            styles.full_screen_background,
            loaded ? styles.animate : '',
          )}
          src={backgroudImageUrl}
          onError={() => this.onError()}
          onLoad={() => this.onLoad()}
        />
        <Image
          className={cs(
            styles.full_screen_background,
            needBlur ? styles.background_blur : '',
            loaded ? styles.animate : '',
          )}
          src={backgroudImageUrl}
        />
      </Block>
    );
  }
}

export default Background as ComponentType;
