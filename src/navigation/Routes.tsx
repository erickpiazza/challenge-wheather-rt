import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherDetails from '../screens/WeatherDetails';
import {ICoord} from '../shared';
import {SearchLocation} from '../screens/SearchLocation';

export type RootStackParamList = {
  WeatherDetails: {coord: ICoord};
  SearchLocation: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Navigator initialRouteName="WeatherDetails">
      <Screen
        name="WeatherDetails"
        component={WeatherDetails}
        initialParams={{coord: {lat: -22.9056, lon: -47.0608}}}
      />
      <Screen name="SearchLocation" component={SearchLocation} />
    </Navigator>
  );
}
