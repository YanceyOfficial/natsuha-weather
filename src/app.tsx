import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import Index from './pages/index';

import weatherStore from './store/weatherStore';

const store = {
  weatherStore
}

class App extends Component {
  config: Config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Natsuha',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
      enablePullDownRefresh: true,
    },
    permission: {
      'scope.userLocation': {
        desc: '現在の位置情報を利用します。よろしいですか？',
      }
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
