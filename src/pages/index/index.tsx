import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { WeatherProps } from '../../types/weather'
import './index.scss'

import Summary from '../../components/Summary/Summary'
import Detail from '../../components/Detail/Detail'
import SunAndMoon from '../../components/SunAndMoon/SunAndMoon'
import Wind from '../../components/Wind/Wind'
import Forecast from '../../components/Forecast/Forecast'
import Background from '../../components/Background/Background'
import Precipitation from '../../components/Precipitation/Precipitation'
import Search from '../../components/Search/Search'
import Modal from '../../components/Widget/Modal/Modal'

interface IndexStates {
  needBlur: boolean
}

@inject('weatherStore')
@observer
class Index extends Component<WeatherProps, IndexStates> {
  constructor(props: WeatherProps) {
    super(props)
    this.state = {
      needBlur: false,
    }
  }

  componentWillMount() {
    Taro.cloud.init()
  }

  componentDidMount() {
    const { weatherStore } = this.props
    weatherStore.getLanguage()
  }

  config: Config = {
    navigationBarTitleText: 'Natsuha',
  }

  public onPullDownRefresh = () => {
    const {
      weatherStore: { curWoeid, getWeatherById, getPosition },
    } = this.props
    if (curWoeid) {
      getWeatherById(curWoeid)
    } else {
      getPosition()
    }
  }

  public onShareAppMessage = () => {
    const { widthBackgroudImageUrl } = this.props.weatherStore
    return {
      title: 'Natsuha Weather',
      path: '/pages/index/index',
      imageUrl: widthBackgroudImageUrl,
    }
  }

  public onPageScroll(e) {
    if (e.scrollTop >= 100) {
      this.setState({
        needBlur: true,
      })
    } else {
      this.setState({
        needBlur: false,
      })
    }
  }

  render() {
    const { needBlur } = this.state
    const { showModal, showSearch } = this.props.weatherStore
    return (
      <View className='index' style={showSearch ? { position: 'fixed' } : {}}>
        {showModal ? <Modal /> : null}
        <Background needBlur={needBlur} />
        <Summary />
        <Forecast />
        <Detail />
        <Precipitation />
        <SunAndMoon />
        <Wind />
        <Search />
      </View>
    )
  }
}

export default Index as ComponentType
