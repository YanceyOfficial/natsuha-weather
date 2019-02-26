import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IMeta, IWeather } from '../../types/weather';
import { defaultPhotoUrl } from '../../constants/constants';

type PageStateProps = {
  title: string;
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

interface Background {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class Background extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      weatherStore: { weatherData }
    } = this.props;
    const photoUrl = weatherData.photos
      ? weatherData.photos[0].resolutions[5].url
      : defaultPhotoUrl;
    const style = {
      position: 'fixed',
      backgroundImage: `url(${photoUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      willChange: 'transform',
      zIndex: -1
    };
    return <View style={style} />;
  }
}

export default Background as ComponentType;
