import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import {WeatherDetails} from '../../components/WeatherDetails';
import {RootStackParamList} from '../../navigation/Routes';
import {useWeatherDetails} from '../../utils/hooks/useWeatherDetails';

type WeatherDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WeatherDetailsScreen'
>;

export default function WeatherDetailsScreen({
  route,
  navigation,
}: WeatherDetailsScreenProps) {
  const coord = route.params.coord;
  const {weatherDetails} = useWeatherDetails(coord);

  return (
    <>
      <WeatherDetails weather={weatherDetails} />
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
