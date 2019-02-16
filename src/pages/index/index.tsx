import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import './index.scss';

type PageStateProps = {
  counterStore: {
    counter: number;
    increment: Function;
    decrement: Function;
    incrementAsync: Function;
  };
};

interface Index {
  props: PageStateProps;
}

@inject('counterStore')
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
    navigationBarTitleText: '首页'
  };

  componentWillMount() {}

  componentWillReact() {
    console.log('componentWillReact');
  }

  componentDidMount() {}

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
      </View>
    );
  }
}

export default Index as ComponentType;
