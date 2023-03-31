import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import {WeatherDetails} from '../components/WeatherDetails';
import {RootStackParamList} from '../navigation/Routes';
import getLocation from '../services/getLocation';
import {ILocation} from '../shared';
import useDebounce from '../utils/hooks/useDebounce';

type SearchLocationProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchLocationScreen'
>;

export function SearchLocation({}: SearchLocationProps) {
  const [locationText, onChangeLocation] = useState('');
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [locationSelected, setLocationSelected] = useState<
    ILocation | undefined
  >();
  const debouncedValue = useDebounce<string>(locationText);

  const searchLocation = useCallback(async (location: string) => {
    const responseLocations = await getLocation({city: location});
    setLocations(responseLocations);
  }, []);

  useEffect(() => {
    searchLocation(debouncedValue);
  }, [debouncedValue, searchLocation]);

  return (
    <>
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
              onPress={() => setLocationSelected(location.item)}>
              <Text>{location.item.name}</Text>
              <Text>{location.item.state}</Text>
              <Text>{location.item.country}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* TODO:criar um componente para este modal  */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={!!locationSelected}
        onRequestClose={() => {
          setLocationSelected(undefined);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTexto}>Este é um modal</Text>
            <TouchableOpacity onPress={() => setLocationSelected(undefined)}>
              <Text style={styles.textoBotao}>Fechar modal</Text>
            </TouchableOpacity>

            <WeatherDetails
              activeActions
              coord={{
                lat: locationSelected?.lat || 0,
                lon: locationSelected?.lon || 0,
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
