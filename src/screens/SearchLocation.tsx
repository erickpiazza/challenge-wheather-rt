import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../navigation/Routes';
import getLocation from '../services/getLocation';
import {ILocation} from '../shared';
import {saved} from '../store/slice/storeWeatherReducer';
import useDebounce from '../utils/hooks/useDebounce';

type SearchLocationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchLocation'
>;

export function SearchLocation({navigation}: SearchLocationProps) {
  const [locationText, onChangeLocation] = useState('');
  const [locations, setLocations] = useState<ILocation[]>([]);
  const count = useSelector(state => state.storeWeather.value);
  const dispatch = useDispatch();
  const debouncedValue = useDebounce<string>(locationText);

  console.log('count', count);

  const searchLocation = useCallback(async (location: string) => {
    const responseLocations = await getLocation({city: location});
    setLocations(responseLocations);
    console.log('responseLocation', responseLocations);
  }, []);

  useEffect(() => {
    console.log('efect debouncedValue', debouncedValue);
    searchLocation(debouncedValue);
  }, [debouncedValue, searchLocation]);

  function handlerClickLocation(locationSelected: ILocation) {
    dispatch(saved());
    console.log('clicl', locationSelected);
  }

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
