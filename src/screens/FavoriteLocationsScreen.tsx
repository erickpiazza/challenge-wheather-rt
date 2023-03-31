import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';

import {RootStackParamList} from '../navigation/Routes';
import {useAppSelector} from '../utils/hooks/useAppSelector';

type FavoriteLocationsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FavoriteLocationsScreen'
>;

function FavoriteLocationsScreen({}: FavoriteLocationsScreenProps) {
  const weathers = useAppSelector(state => state.storeWeather.weathers);
  return (
    <FlatList
      style={{paddingHorizontal: 16}}
      data={weathers}
      contentContainerStyle={{backgroundColor: 'red'}}
      renderItem={location => (
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'space-between'}}
          onPress={() => {}}>
          <Text>{location.item.name}</Text>
          <Text>{location.item.state}</Text>
          <Text>{location.item.country}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

export default FavoriteLocationsScreen;
