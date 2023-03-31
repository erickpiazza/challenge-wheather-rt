import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {useAppSelector} from '../../utils/hooks/useAppSelector';

export default function FavoriteLocationsScreen() {
  const weathers = useAppSelector(state => state.storeWeather.weathers);
  return (
    <FlatList
      style={styles.container}
      data={weathers}
      renderItem={location => (
        <TouchableOpacity style={styles.itemList} onPress={() => {}}>
          <Text>{location.item.name}</Text>
          <Text>{location.item.state}</Text>
          <Text>{location.item.country}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemList: {flexDirection: 'row', justifyContent: 'space-between'},
  container: {paddingHorizontal: 16},
});
