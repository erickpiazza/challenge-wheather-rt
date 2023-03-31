import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import getLocation from '../../services/getLocation';
import {ILocation} from '../../shared';
import useDebounce from '../../utils/hooks/useDebounce';
import ModalWeather from './components/ModalWeather';

export default function SearchLocationScreen() {
  const [locationText, onChangeLocation] = useState('');
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [locationSelected, setLocationSelected] = useState<
    ILocation | undefined
  >();
  const debouncedValue = useDebounce<string>(locationText);

  const searchLocation = useCallback(async (location: string) => {
    const responseLocations = await getLocation({city: location});
    console.log('outro log', responseLocations);
    setLocations(responseLocations);
  }, []);

  useEffect(() => {
    searchLocation(debouncedValue);
  }, [debouncedValue, searchLocation]);

  return (
    <>
      <View>
        <FlatList
          testID="INPUT_SEARCH_LOCATION"
          style={styles.container}
          ListHeaderComponent={
            <TextInput
              autoCorrect={false}
              value={locationText}
              onChangeText={onChangeLocation}
              style={styles.input}
              placeholder="pesquisar cidade"
            />
          }
          data={locations}
          renderItem={location => (
            <TouchableOpacity
              style={styles.itemList}
              onPress={() => setLocationSelected(location.item)}>
              <Text>{location.item.name}</Text>
              <Text>{location.item.state}</Text>
              <Text>{location.item.country}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {!!locationSelected && (
        <ModalWeather
          visible={!!locationSelected}
          onClose={() => {
            setLocationSelected(undefined);
          }}
          coord={{
            lat: locationSelected?.lat || 0,
            lon: locationSelected?.lon || 0,
          }}
        />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  input: {borderWidth: 1, borderColor: 'black', padding: 8, marginBottom: 8},
  itemList: {flexDirection: 'row', justifyContent: 'space-between'},
  container: {paddingHorizontal: 16},
});
