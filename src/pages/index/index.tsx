import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../types/weather';

import Summary from '../../components/Summary/Summary';
import Detail from '../../components/Detail/Detail';
import SunAndMoon from '../../components/SunAndMoon/SunAndMoon';
import Wind from '../../components/Wind/Wind';
import Forecast from '../../components/Forecast/Forecast';
import Background from '../../components/Background/Background';
import Precipitation from '../../components/Precipitation/Precipitation';
import Modal from '../../components/Modal/Modal';
import Search from '../../components/Search/Search';

import './index.scss';

interface IIndexStates {
  needBlur: boolean;
}

@inject('weatherStore')
@observer
class Index extends Component<IWeatherProps, IIndexStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      needBlur: false,
    };
  }
  config: Config = {
    navigationBarTitleText: '夏葉',
  };

  componentWillMount() {
    wx.cloud.init();
  }

  componentDidShow(){
    const { weatherStore } = this.props;
    weatherStore.getLanguage();
  }

  // componentDidMount() {
  //   const { weatherStore } = this.props;
  //   weatherStore.getLanguage();
  // }

  public onPullDownRefresh = () => {
    const { weatherStore } = this.props;
    weatherStore.getLanguage();
  };

  public onShareAppMessage = res => {
    const { widthBackgroudImageUrl } = this.props.weatherStore;
    if (res.from === 'button') {
      // todo
    }
    return {
      title: 'Natsuha Weather',
      path: '/pages/index/index',
      imageUrl: widthBackgroudImageUrl,
    };
  };

  public onPageScroll(e: any) {
    if (e.scrollTop >= 100) {
      this.setState({
        needBlur: true,
      });
    } else {
      this.setState({
        needBlur: false,
      });
    }
  }

  render() {
    const { needBlur } = this.state;
    const { showModal } = this.props.weatherStore;
    return (
      <View className='index'>
        {showModal ? <Modal /> : null}
        <Background needBlur={needBlur} />
        <Summary />
        <Forecast />
        <Detail />
        <Precipitation />
        <SunAndMoon />
        <Wind />
        <Search />
      </View>
    );
  }
}

export default Index as ComponentType;
