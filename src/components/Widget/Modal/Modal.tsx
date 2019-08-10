import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Block } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import cs from 'classnames';
import { toastTxt } from '../../../constants/constants';
import { IWeatherProps } from '../../../types/weather';


@inject('weatherStore')
@observer
class Modal extends Component<IWeatherProps, {}> {
  public onOpenSetting() {
    const {
      weatherStore: { getSetting },
    } = this.props;
    getSetting();
  }
  render() {
    const {
      weatherStore: { showModal },
    } = this.props;
    const modalGroup = (
      <Block>
        <View className={styles.modal_wrapper}>
          <View>
            <Text className={styles.title}>{toastTxt.authorizeRequest}</Text>
            <View className={styles.button_group}>
              <View className={cs(styles.button_cancel)}>Cancel</View>
              <Button
                className={cs(styles.button, styles.button_confirm)}
                openType='openSetting'
                onOpenSetting={() => this.onOpenSetting()}
              >
                OK
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
