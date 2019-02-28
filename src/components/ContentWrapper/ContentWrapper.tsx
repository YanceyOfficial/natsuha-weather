import Taro, { Component } from '@tarojs/taro';
import { View, Text, Block } from '@tarojs/components';
import IContentWrapperProps from '../../types/contentWrapper';
const styles = require('./ContentWrapper.module.scss');

class ContentWrapper extends Component<IContentWrapperProps, {}> {
  render() {
    const { title } = this.props;

    return (
      <View className={styles.content_wrapper}>
        <Text className={styles.header}>{title}</Text>
        {/* wx小程序必须用 this.props.children，而不能用解构 */}
        {/* 文档：https://nervjs.github.io/taro/docs/children.html */}
        <Block>{this.props.children}</Block>
      </View>
    );
  }
}

export default ContentWrapper;
