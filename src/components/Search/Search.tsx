import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import styles from './Search.module.scss';
import { observer, inject } from '@tarojs/mobx';
import { IMeta, IWeather } from '../../types/weather';
import ContentWrapper from '../ContentWrapper/ContentWrapper';

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
      <ContentWrapper title='shabi'>
        <View className={styles.summary_wrapper}>
          <Text>caoncimabi</Text>
        </View>
      </ContentWrapper>
    );
  }
}

export default Search as ComponentType;
