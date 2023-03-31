import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {RootStackParamList} from '../../navigation/Routes';

import {useAppSelector} from '../../utils/hooks/useAppSelector';

type FavoriteLocationsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FavoriteLocationsScreen'
>;

export default function FavoriteLocationsScreen({
  navigation,
}: FavoriteLocationsScreenProps) {
  const weathers = useAppSelector(state => state.storeWeather.weathers);
  return (
    <FlatList
      style={styles.container}
      data={weathers}
      renderItem={location => (
        <TouchableOpacity
          style={styles.itemList}
          onPress={() =>
            navigation.navigate('WeatherDetailsScreen', {
              coord: {
                lat: location.item.coord.lat,
                lon: location.item.coord.lon,
              },
            })
          }>
          <Text>{location.item.name}</Text>
          {/* <Text>{location.item.state}</Text>
          <Text>{location.item.country}</Text> */}
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemList: {flexDirection: 'row', justifyContent: 'space-between'},
  container: {paddingHorizontal: 16},
});
