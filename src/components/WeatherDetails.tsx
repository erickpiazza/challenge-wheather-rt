import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import getWeather from '../services/getWeather';
import {ICoord, IWeather} from '../shared';
import {savedWeather} from '../store/slice/storeWeatherSlice';
import {useAppDispatch} from '../utils/hooks/useAppDispatch';
import {useAppSelector} from '../utils/hooks/useAppSelector';

interface IWeatherDetailsProps {
  coord: ICoord;
  activeActions?: boolean;
}

export function WeatherDetails({
  coord,
  activeActions = false,
}: IWeatherDetailsProps) {
  const [weatherDetails, setWeatherDetails] = useState<IWeather>();
  const weathers = useAppSelector(state => state.storeWeather.weathers);

  const canSaveThisWeather = useMemo(() => {
    if (!weatherDetails) {
      return false;
    }
    const weatherAlreadyExists = weathers.find(
      weather => weather.id === weatherDetails.id,
    );
    if (weatherAlreadyExists) {
      return false;
    }
    return true;
  }, [weatherDetails, weathers]);

  const dispatch = useAppDispatch();

  const searchWeatherDetails = useCallback(async () => {
    const responseWeather = await getWeather({coord: coord});
    console.log('responseWeather', responseWeather);
    setWeatherDetails(responseWeather);
  }, [coord]);

  useEffect(() => {
    searchWeatherDetails();
  }, [searchWeatherDetails]);

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center'}}>
        {activeActions && (
          <View>
            {canSaveThisWeather && (
              <TouchableOpacity
                onPress={() => dispatch(savedWeather(weatherDetails))}>
                <Text>Adicionar</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <Text>{weatherDetails?.name}</Text>
        <Text>
          {weatherDetails?.main?.temp
            ? Math.round(weatherDetails?.main?.temp)
            : '--'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
