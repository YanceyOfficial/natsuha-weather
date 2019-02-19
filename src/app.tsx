import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/mobx';
import Index from './pages/index';

import counterStore from './store/counter';
import weatherStore from './store/weatherStore';

const store = {
  counterStore,
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
      navigationBarTitleText: '夏葉',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom',
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
