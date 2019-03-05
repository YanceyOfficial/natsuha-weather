import { ComponentType } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Image } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { IWeatherProps } from '../../types/weather';
import cs from 'classnames';
const styles = require('./Search.module.scss');
const search = require('../../assets/images/search.png');
const location = require('../../assets/images/location.png');
const history = require('../../assets/images/history.png');

@inject('weatherStore')
@observer
class Search extends Component<IWeatherProps, {}> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      weatherStore: {
        inputText,
        isSearching,
        showSearch,
        handleInputTextChange,
        regionList,
        handleSelectRegionChange,
        hideSearch,
        deleteHistoryItemByWoeid,
      },
    } = this.props;

    const list = regionList.map(vaule => (
      <View key={vaule.woeid} className={styles.history_item}>
        <View
          className={styles.qualified_name}
          onClick={() =>
            handleSelectRegionChange(vaule.woeid, vaule.qualifiedName)
          }
        >
          {vaule.qualifiedName}
        </View>
        <View
          className={styles.cancel_icon}
          onClick={() => deleteHistoryItemByWoeid(vaule.woeid)}
        />
      </View>
    ));

    return (
      <View
        className={cs(
          styles.search_wrapper,
          !showSearch ? styles.hide_search_wrapper : '',
        )}
      >
        <View className={cs(styles.container, styles.search_container)}>
          <Image src={search} className={cs(styles.icon, styles.search_icon)} />
          <Input
            className={styles.input}
            type='text'
            value={inputText}
            placeholder='Enter City or ZIP code'
            onInput={e => handleInputTextChange(e)}
          />
          {isSearching ? null : (
            <Text onClick={() => hideSearch()}>Cancel</Text>
          )}
        </View>
        <View
          className={cs(styles.container, styles.detech_my_location_container)}
        >
          <Image
            src={location}
            className={cs(styles.icon, styles.location_icon)}
          />
          <Text>Detach my location</Text>
        </View>
        <View className={styles.history}>
          <View className={cs(styles.container, styles.history_container)}>
            <Image
              src={history}
              className={cs(styles.icon, styles.history_icon)}
            />
            <Text>History</Text>
          </View>
          <View className={styles.history_list}>{list}</View>
        </View>
      </View>
    );
  }
}

export default Search as ComponentType;
