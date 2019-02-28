import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IMeta, IWeather } from '../../types/weather';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
const styles = require('./Search.module.scss');

type PageStateProps = {
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

interface Search {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class Search extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      weatherStore: { weatherData, curSkyCode }
    } = this.props;

    return (
      <ContentWrapper title="shabi">
        <View className={styles.summary_wrapper}>
          <Text>fuck yeah</Text>
        </View>
      </ContentWrapper>
    );
  }
}

export default Search as ComponentType;
