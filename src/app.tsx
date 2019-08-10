import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import Index from './pages/index';
import '@tarojs/async-await';
import weatherStore from './store/weatherStore';

const store = {
  weatherStore,
};

class App extends Component {
  config: Config = {
    pages: ['pages/index/index'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Natsuha',
      navigationBarTextStyle: 'black',
      // 设为'custom'可去掉小程序默认header
      navigationStyle: 'custom',
      // 支持下拉刷新
      enablePullDownRefresh: true,
    },
    // 使用位置、用户信息等要添加权限描述
    // 而且还不能引用，只能写纯字符串，md
    permission: {
      'scope.userLocation': {
        desc: '現在の位置情報を利用します。よろしいですか？',
      },
    },
  };

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
