import Taro, { Component } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import ContentWrapperProps from '../../types/contentWrapper'
import styles from './ContentWrapper.module.scss'

class ContentWrapper extends Component<ContentWrapperProps, {}> {
  render() {
    const { title } = this.props

    return (
      <View className={styles.content_wrapper}>
        <Text className={styles.header}>{title}</Text>
        <Block>{this.props.children}</Block>
      </View>
    )
  }
}

export default ContentWrapper
