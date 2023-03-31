import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {IWeather} from '../shared';

interface IWeatherDetailsProps {
  weather?: IWeather;
}

export function WeatherDetails({weather}: IWeatherDetailsProps) {
  return (
    <SafeAreaView>
      <View style={{alignItems: 'center'}}>
        <Text>{weather?.name}</Text>
        <Text>
          {weather?.main?.temp ? `${Math.round(weather?.main?.temp)}°` : '--'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
