import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherDetails from '../screens/WeatherDetailsScreen';
import {ICoord} from '../shared';
import {SearchLocation} from '../screens/SearchLocationScreen';
import FavoriteLocationsScreen from '../screens/FavoriteLocationsScreen';

export type RootStackParamList = {
  WeatherDetailsScreen: {coord: ICoord};
  SearchLocationScreen: undefined;
  FavoriteLocationsScreen: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Navigator initialRouteName="WeatherDetailsScreen">
      <Screen
        name="WeatherDetailsScreen"
        component={WeatherDetails}
        initialParams={{coord: {lat: -22.9056, lon: -47.0608}}}
      />
      <Screen name="SearchLocationScreen" component={SearchLocation} />
      <Screen
        name="FavoriteLocationsScreen"
        component={FavoriteLocationsScreen}
      />
    </Navigator>
  );
}
