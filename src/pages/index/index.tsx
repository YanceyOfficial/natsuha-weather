import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import Summary from '../../components/Summary/Summary';
import Detail from '../../components/Detail/Detail';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import SunAndMoon from '../../components/SunAndMoon/SunAndMoon';
import Wind from '../../components/Wind/Wind';
import Forecast from '../../components/Forecast/Forecast';

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

  render() {
    return (
      <View className="index">
        <Summary />
        <Forecast />
        <Detail />
        <ContentWrapper />
        <SunAndMoon />
        <Wind />
      </View>
    );
  }
}

export default Index as ComponentType;
