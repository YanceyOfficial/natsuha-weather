import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { observer, inject } from '@tarojs/mobx';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import ForecastByHour from './ForecastByHour/ForecastByHour';
import ForecastByDay from './ForecastByDay/ForecastByDay';

@inject('weatherStore')
@observer
class Forecast extends Component {
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
