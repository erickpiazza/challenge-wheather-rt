import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../navigation/Routes';
import getLocation from '../services/getLocation';
import {ILocation} from '../shared';

import useDebounce from '../utils/hooks/useDebounce';

type SearchLocationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchLocation'
>;

export function SearchLocation({navigation}: SearchLocationProps) {
  const [locationText, onChangeLocation] = useState('');
  const [locations, setLocations] = useState<ILocation[]>([]);
  const debouncedValue = useDebounce<string>(locationText);

  const searchLocation = useCallback(async (location: string) => {
    const responseLocations = await getLocation({city: location});
    setLocations(responseLocations);
  }, []);

  useEffect(() => {
    searchLocation(debouncedValue);
  }, [debouncedValue, searchLocation]);

  function handlerClickLocation(locationSelected: ILocation) {
    navigation.navigate('WeatherDetails', {
      coord: {lat: locationSelected.lat, lon: locationSelected.lon},
    });
  }

  return (
    <View>
      <FlatList
        style={{paddingHorizontal: 16}}
        ListHeaderComponent={
          <TextInput
            autoCorrect={false}
            value={locationText}
            onChangeText={onChangeLocation}
            style={{
              borderWidth: 1,
              borderColor: 'black',
              padding: 8,
              marginBottom: 8,
            }}
            placeholder="pesquisar cidade"
          />
        }
        data={locations}
        renderItem={location => (
          <TouchableOpacity
            style={{flexDirection: 'row', justifyContent: 'space-between'}}
            onPress={() => handlerClickLocation(location.item)}>
            <Text>{location.item.name}</Text>
            <Text>{location.item.state}</Text>
            <Text>{location.item.country}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
