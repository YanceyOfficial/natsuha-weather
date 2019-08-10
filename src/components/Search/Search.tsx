import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import {
  View,
  Text,
  Input,
  Image,
  Block,
  Form,
  Button,
} from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../types/weather';
import cs from 'classnames';
import styles from './Search.module.scss';
import search from '../../assets/images/search.png';
import location from '../../assets/images/location.png';
import history from '../../assets/images/history.png';

@inject('weatherStore')
@observer
class Search extends Component<IWeatherProps, {}> {
  render() {
    const {
      weatherStore: {
        isSearching,
        showSearch,
        handleInputTextChange,
        regionList,
        handleSelectRegionChange,
        hideSearchDialog,
        deleteHistoryItemByWoeid,
        getPosition,
      },
    } = this.props;

    const list = regionList.map(vaule => (
      <View key={vaule.woeid} className={styles.history_item}>
        <Button
          className={cs(styles.button, styles.qualified_name)}
          formType='reset'
          onClick={() =>
            handleSelectRegionChange(
              vaule.woeid.toString(),
              vaule.qualifiedName,
            )
          }
        >
          {vaule.qualifiedName}
        </Button>
        {isSearching ? null : (
          <View
            className={styles.cancel_icon}
            onClick={() => deleteHistoryItemByWoeid(vaule.woeid.toString())}
          />
        )}
      </View>
    ));

    return (
      <Block>
        <Form
          onReset={() => hideSearchDialog()}
          className={cs(
            styles.search_wrapper,
            !showSearch ? styles.hide_search_wrapper : '',
          )}
        >
          <View className={cs(styles.container, styles.search_container)}>
            <Image
              src={search}
              className={cs(styles.icon, styles.search_icon)}
            />
            <Input
              className={styles.input}
              type='text'
              placeholder='Enter City or ZIP code'
              onInput={e => handleInputTextChange(e)}
            />
            <Button
              className={cs(styles.button, styles.close_btn)}
              formType='reset'
            >
              Close
            </Button>
          </View>
          <View
            className={cs(
              styles.container,
              styles.detech_my_location_container,
            )}
          >
            <Image
              src={location}
              className={cs(styles.icon, styles.location_icon)}
            />
            <Text onClick={() => getPosition()}>Detach my location</Text>
          </View>
          <View className={styles.history}>
            {!isSearching ? (
              <View className={cs(styles.container, styles.history_container)}>
                <Image
                  src={history}
                  className={cs(styles.icon, styles.history_icon)}
                />
                <Text>History</Text>
              </View>
            ) : null}

            <View className={styles.history_item}>{list}</View>
          </View>
        </Form>
        {showSearch ? <View className={styles.mask} /> : null}
      </Block>
    );
  }
}

export default Search as ComponentType;
