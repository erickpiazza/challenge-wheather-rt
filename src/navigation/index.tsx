import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Routes} from './Routes';

export function RootNavigation() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
