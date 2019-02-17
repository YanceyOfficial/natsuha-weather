import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.scss';

type PageStateProps = {
  counterStore: {
    counter: number;
    increment: Function;
    decrement: Function;
    incrementAsync: Function;
  };
  weatherStore: {
    getWeatherById: Function;
    getCloudData: Function;
  };
};

interface Index {
  props: PageStateProps;
}

@inject('counterStore')
@inject('weatherStore')
@observer
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: 'なつは'
  };

  componentWillMount() {

  }

  componentDidMount() {
    const { weatherStore } = this.props;
    // weatherStore.getWeatherById();
    // weatherStore.getCloudData();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  increment = () => {
    const { counterStore } = this.props;
    counterStore.increment();
  };

  decrement = () => {
    const { counterStore } = this.props;
    counterStore.decrement();
  };

  incrementAsync = () => {
    const { counterStore } = this.props;
    counterStore.incrementAsync();
  };

  handleClick = () => {
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getWeatherById',
      // 传给云函数的参数
      data: {
        woeid: '2151849',
        lang: 'en-US',
      },
      success(res) {
        console.log(res)
      },
      fail: console.error
    })
  }

  getSystemInfo = () => {
    const res = Taro.getSystemInfoSync();
    console.log(res.brand);
    console.log(res.model);
    console.log(res.system); // 可拿到系统版本 iOS 12.1.4
    console.log(res.screenWidth);
    console.log(res.screenHeight);
    console.log(res.pixelRatio);
    console.log(res.windowWidth);
    console.log(res.windowHeight);
    console.log(res.version); // 微信版本 7.0.3
    console.log(res.statusBarHeight);
    console.log(res.platform); // 可用于判断安卓还是iOS ios
    console.log(res.language); // 判断语言 zh-CN ja 注：这里的语言跟系统语言设置无关，因为微信在设置里可以自定义语言
    console.log(res.fontSizeSetting);
    console.log(res.SDKVersion);
  };

  render() {
    const {
      counterStore: { counter }
    } = this.props;
    return (
      <View className="index">
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <Button onClick={this.getSystemInfo}>getSystemInfo</Button>
        <Button onClick={this.handleClick}>handleClick</Button>
        <Image
          style="width: 100vw;height: 100vh;background: #fff;"
          src="https://s.yimg.com/un/api/res/1.2/2f4JTsguRoJioZhJY21PBw--/YXBwaWQ9eW13ZWF0aGVyO2NjPTg2NDAwO3E9ODA7Zmk9ZmlsbDt3PTcyMDtoPTEyODA7ZnI9MA--/https://s3.us-east-2.amazonaws.com/weather-flickr-images/farm6/5474/12002201555_e1b49c66a9_k"
        />
      </View>
    );
  }
}

export default Index as ComponentType;
