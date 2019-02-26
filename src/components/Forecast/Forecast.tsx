import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { observer, inject } from '@tarojs/mobx';
import ForecastByHour from './ForecastByHour/ForecastByHour';
import ForecastByDay from './ForecastByDay/ForecastByDay';
import ContentWrapper from '../ContentWrapper/ContentWrapper';

@inject('weatherStore')
@observer
class Forecast extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {

    return (
      <ContentWrapper title="Forecast">
        <ForecastByHour />
        <ForecastByDay />
      </ContentWrapper>
    );
  }
}

export default Forecast as ComponentType;
