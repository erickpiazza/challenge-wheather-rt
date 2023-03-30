import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {RootStackParamList} from '../navigation/Routes';
import getWeather from '../services/getWeather';
import {IWeather} from '../shared';

type WeatherDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'WeatherDetails'
>;

const WeatherDetails = ({navigation, route}: WeatherDetailsProps) => {
  const [weatherDetails, setWeatherDetails] = useState<IWeather>();
  const coord = route.params.coord;
  console.log('navigation', navigation);
  console.log('route', route);

  const searchWeatherDetails = useCallback(async () => {
    const responseWeather = await getWeather({coord: coord});
    setWeatherDetails(responseWeather);
    console.log('responseWeather', responseWeather);
  }, [coord]);

  useEffect(() => {
    searchWeatherDetails();
  }, [searchWeatherDetails]);

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center'}}>
        <Text>{weatherDetails?.name}</Text>
        <Text>
          {weatherDetails?.main?.temp
            ? Math.round(weatherDetails?.main?.temp)
            : '--'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WeatherDetails;
