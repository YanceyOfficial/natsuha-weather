import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import cs from 'classnames';
const styles = require('./Toast.module.scss');
const fail = require('../../../assets/images/fail.png');

interface IToastProps {
  type: 'success' | 'fail' | 'loading' | 'info';
  text: string;
  mask?: boolean;
  show?: boolean;
  during?: number;
}

class Toast extends Component<IToastProps, {}> {
  static setToast;
  render() {
    const type = this.props.type;
    const text = this.props.text;
    const mask = this.props.mask;
    const show = this.props.show;
    const during = this.props.during;
    return (
      <View className={styles.toast_wrapper}>
        <View className={styles.toast}>
          <Image src={fail} className={styles.icon} />
          <Text className={styles.txt}>{text}</Text>
        </View>
        {mask ? <View className={styles.mask} /> : null}
      </View>
    );
  }
}

export default Toast as ComponentType;
