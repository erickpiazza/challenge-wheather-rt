import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import getWeather from '../services/getWeather';
import {ICoord, IWeather} from '../shared/interfaces';

interface IWeatherDetailsProps {
  coord: ICoord;
}

const WeatherDetails = ({coord}: IWeatherDetailsProps) => {
  const [weatherDetails, setWeatherDetails] = useState<IWeather>();

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
