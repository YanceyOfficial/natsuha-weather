import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Picker, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../../types/weather';
import { getImageUrl } from '../../../utils/util';
const styles = require('./ForecastByHour.module.scss');

interface IForecastByHourStates {
  numbers: number[];
  typeList: string[];
  selected: string;
}

@inject('weatherStore')
@observer
class ForecastByHour extends Component<IWeatherProps, IForecastByHourStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      numbers: [...Array(25).keys()],
      typeList: ['Temperature', 'Precipitation', 'Wind'],
      selected: 'Temperature'
    };
  }

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
        className={styles.icon}
          src={getImageUrl('Temperature', curSkyCode)}
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
