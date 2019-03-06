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
import Search from '../../components/Search/Search';
import Modal from '../../components/Widget/Modal/Modal';
import Toast from '../../components/Widget/Toast/Toast';

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

  componentDidMount() {
    const { weatherStore } = this.props;
    weatherStore.getLanguage();
  }

  public onPullDownRefresh = () => {
    const { weatherStore } = this.props;
    weatherStore.getWeatherById();
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
    const { showModal, showSearch } = this.props.weatherStore;
    return (
      <View className='index' style={showSearch ? { position: 'fixed' } : {}}>
        {showModal ? <Modal /> : null}
        {/* <Toast type='fail' mask text='天気情報の取得に失敗しました' /> */}
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
