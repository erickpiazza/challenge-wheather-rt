import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WeatherDetailsScreen from '../screens/WeatherDetailsScreen/WeatherDetailsScreen';
import SearchLocationScreen from '../screens/SearchLocationScreen';
import FavoriteLocationsScreen from '../screens/FavoriteLocationsScreen';

import {ICoord} from '../shared';

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
        component={WeatherDetailsScreen}
        initialParams={{coord: {lat: -22.9056, lon: -47.0608}}}
      />
      <Screen name="SearchLocationScreen" component={SearchLocationScreen} />
      <Screen
        name="FavoriteLocationsScreen"
        component={FavoriteLocationsScreen}
      />
    </Navigator>
  );
}
