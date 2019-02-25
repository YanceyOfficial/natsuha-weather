import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Picker, Image } from '@tarojs/components';
import styles from './ForecastByHour.module.scss';
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

type IForecastByHourStates = {
  numbers: number[];
  typeList: string[];
  selected: string;
};

interface ForecastByHour {
  props: PageStateProps;
  state: IForecastByHourStates;
}

@inject('weatherStore')
@observer
class ForecastByHour extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      numbers: [...Array(25).keys()],
      typeList: ['Temperature', 'Precipitation', 'Wind'],
      selected: 'Temperature'
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  public onSelectChange = e => {
    this.setState({
      selected: this.state.typeList[e.detail.value]
    });
  };

  render() {
    const {
      weatherStore: { curSkyCode }
    } = this.props;

    const { numbers, typeList, selected } = this.state;

    const temperature = numbers.map(number => (
      <View className={styles.precipitation_group}>
        <Text>11AM</Text>
        <Image
          style="display: block; width: 28px;height: 28px; margin: 4px 0"
          src={`https://s.yimg.com/os/weather/1.0.1/shadow_icon/60x60/clear_day@2x.png`}
        />
        <Text>59°</Text>
      </View>
    ));

    return (
      <View className={styles.forecast_hour_container}>
        <View className={styles.mask} />
        <Picker
          mode="selector"
          range={typeList}
          value={0}
          onChange={e => this.onSelectChange(e)}
        >
          <View className={styles.picker}>
            {selected}
            <View className={styles.arrow} />
          </View>
        </Picker>
        <View className={styles.precipitation_contaienr}>{temperature}</View>
      </View>
    );
  }
}

export default ForecastByHour as ComponentType;
