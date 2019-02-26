import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import Summary from '../../components/Summary/Summary';
import Detail from '../../components/Detail/Detail';
import SunAndMoon from '../../components/SunAndMoon/SunAndMoon';
import Wind from '../../components/Wind/Wind';
import Forecast from '../../components/Forecast/Forecast';
import Background from '../../components/Background/Background';
import Precipitation from '../../components/Precipitation/Precipitation';
import Search from '../../components/Search/Search';

import './index.scss';

type PageStateProps = {
  weatherStore: {
    getWeatherById: Function;
    getRegion: Function;
    getPosition: Function;
  };
};

interface Index {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '夏葉'
  };

  componentWillMount() {
    wx.cloud.init();
  }

  componentDidMount() {
    const { weatherStore } = this.props;
    weatherStore.getPosition();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  public onPullDownRefresh = () => {
    const { weatherStore } = this.props;
    weatherStore.getPosition();
  };

  render() {
    return (
      <View className="index">
        <Background />
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
