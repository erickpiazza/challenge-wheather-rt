import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {IWeather} from '../shared';

interface IWeatherDetailsProps {
  weather?: IWeather;
}

export function WeatherDetails({weather}: IWeatherDetailsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.boxTitle}>
        <Text>{weather?.name}</Text>
        <Text>
          {weather?.main?.temp ? `${Math.round(weather?.main?.temp)}°` : '--'}
        </Text>
      </View>

      <View />

      <View style={styles.boxMaxAndMin}>
        <Text>
          {weather?.main?.temp
            ? `Max.${Math.round(weather?.main?.temp_max)}°`
            : '--'}
        </Text>
        <Text>
          {weather?.main?.temp
            ? `Min.${Math.round(weather?.main?.temp_min)}°`
            : '--'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 8},
  boxTitle: {alignItems: 'center'},
  boxMaxAndMin: {flexDirection: 'row', justifyContent: 'space-around'},
});
