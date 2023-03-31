import {useCallback, useEffect, useState} from 'react';
import getWeather from '../../services/getWeather';
import {ICoord, IWeather} from '../../shared';

export const useWeatherDetails = (coord?: ICoord) => {
  const [weatherDetails, setWeatherDetails] = useState<IWeather>();

  const searchWeatherDetails = useCallback(async () => {
    if (!coord) {
      return;
    }
    const responseWeather = await getWeather({coord: coord});

    setWeatherDetails(responseWeather);
  }, [coord]);

  useEffect(() => {
    searchWeatherDetails();
  }, [searchWeatherDetails]);

  return {weatherDetails};
};
