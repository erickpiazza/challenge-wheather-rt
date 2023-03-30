import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import {RootStackParamList} from '../navigation/Routes';
import getLocation from '../services/getLocation';
import {ILocation} from '../shared';
import useDebounce from '../utils/hooks/useDebounce';

type SearchLocationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchLocation'
>;

export function SearchLocation({}: SearchLocationProps) {
  const [locationText, onChangeLocation] = useState('');
  const [locations, setLocations] = useState<ILocation[]>([]);
  const debouncedValue = useDebounce<string>(locationText);

  const searchLocation = useCallback(async (location: string) => {
    const responseLocations = await getLocation({city: location});
    setLocations(responseLocations);
    console.log('responseLocation', responseLocations);
  }, []);

  useEffect(() => {
    console.log('efect debouncedValue', debouncedValue);
    searchLocation(debouncedValue);
  }, [debouncedValue, searchLocation]);

  return (
    <View>
      <FlatList
        style={{paddingHorizontal: 16}}
        ListHeaderComponent={
          <TextInput
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{location.item.name}</Text>
            <Text>{location.item.state}</Text>
            <Text>{location.item.country}</Text>
          </View>
        )}
      />
    </View>
  );
}
