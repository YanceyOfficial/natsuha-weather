import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Block } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import cs from 'classnames';
import { IWeatherProps } from '../../types/weather';
const styles = require('./Modal.module.scss');

@inject('weatherStore')
@observer
class Modal extends Component<IWeatherProps, {}> {
  render() {
    const { showModal } = this.props.weatherStore;
    const modalGroup = (
      <Block>
        <View className={styles.modal_wrapper}>
          <View>
            <Text className={styles.title}>
              傻逼玩意儿，不开位置授权咋看天气？
            </Text>
            <View className={styles.button_group}>
              <View className={cs(styles.button, styles.button_cancel)}>
                取消
              </View>
              <Button
                className={cs(styles.button, styles.button_confirm)}
                openType='openSetting'
              >
                去开启
              </Button>
            </View>
          </View>
        </View>
        <View className={styles.mask} />
      </Block>
    );
    return showModal ? modalGroup : null;
  }
}

export default Modal as ComponentType;
