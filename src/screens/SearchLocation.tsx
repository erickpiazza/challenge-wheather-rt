import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {RootStackParamList} from '../navigation/Routes';
import getLocation from '../services/getLocation';
import useDebounce from '../utils/hooks/useDebounce';

type SearchLocationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchLocation'
>;

export function SearchLocation({}: SearchLocationProps) {
  const [locationText, onChangeLocation] = useState('');
  const debouncedValue = useDebounce<string>(locationText);

  const searchLocation = useCallback(async (location: string) => {
    const responseLocation = await getLocation({city: location});

    console.log('responseLocation', responseLocation);
  }, []);

  useEffect(() => {
    console.log('efect debouncedValue', debouncedValue);
    searchLocation(debouncedValue);
  }, [debouncedValue, searchLocation]);

  return (
    <View>
      <TextInput
        value={locationText}
        onChangeText={onChangeLocation}
        style={{borderWidth: 1, borderColor: 'black', padding: 8}}
        placeholder="pesquisar cidade"
      />
      <Text>Location</Text>
    </View>
  );
}
