import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Label, Radio, Block } from '@tarojs/components';
import styles from './ForecastByDay.module.scss';
import cs from 'classnames';
import { observer, inject } from '@tarojs/mobx';
import { IMeta, IWeather } from '../../../types/weather';

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

interface ForecastByDay {
  props: PageStateProps;
}

@inject('weatherStore')
@observer
class ForecastByDay extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: false,
      numbers: [...Array(10).keys()]
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  public select = () => {
    this.setState({
      selected: true
    });
  };

  render() {
    const {
      weatherStore: { curSkyCode }
    } = this.props;

    const { selected, numbers } = this.state;

    const value = numbers.map(number => (
      <Block>
        <View className={styles.day_group} onClick={() => this.select()}>
          <View className={styles.group_basic}>
            <Text>Saturday</Text>
            <View className={styles.condition_img}>
              <Image
                style="width: 32px;height: 32px;"
                src="https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/partly_cloudy_day@2x.png"
              />
            </View>
            <View className={styles.precipitation_group}>
              <Image
                style="width: 24px;height: 24px;"
                src="https://s.yimg.com/os/weather/1.0.1/precipitation/54x60/rain_ico_0@2x.png"
              />
              <Text className={styles.precipitation}>0%</Text>
            </View>
            <Text className={styles.high}>62°</Text>
            <Text className={styles.low}>42°</Text>
          </View>
        </View>
        <View
          className={cs(
            styles.group_detail_container,
            selected ? styles.selected : ''
          )}
        >
          <Text className={styles.group_detail}>
            Partly cloudy today with a high of 67 °F (19.4 °C) and a low of 48
            °F (8.9 °C).
          </Text>
          <Text className={styles.group_detail}>
            Partly cloudy today with a high of 67 °F (19.4 °C) and a low of 48
            °F (8.9 °C).
          </Text>
        </View>
      </Block>
    ));

    return (
      <View className={styles.forecast_day_conatainer}>
        <Block>{value}</Block>
        <View className={styles.day_picker}>
          <Text className={styles.five_day}>5 DAY</Text>
          <Text>10 DAY</Text>
        </View>
      </View>
    );
  }
}

export default ForecastByDay as ComponentType;
