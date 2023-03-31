import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import {WeatherDetails} from '../components/WeatherDetails';
import {RootStackParamList} from '../navigation/Routes';

type WeatherDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WeatherDetailsScreen'
>;

function WeatherDetailsScreen({route, navigation}: WeatherDetailsScreenProps) {
  const coord = route.params.coord;

  return (
    <>
      <WeatherDetails coord={coord} />
      <Button
        onPress={() => navigation.navigate('SearchLocationScreen')}
        title="Buscar localizaçao"
      />
      <Button
        onPress={() => navigation.navigate('FavoriteLocationsScreen')}
        title="Favoritos"
      />
    </>
  );
}

export default WeatherDetailsScreen;
