import {configureStore} from '@reduxjs/toolkit';
import storeWeatherReducer from './slice/storeWeatherReducer';

export default configureStore({
  reducer: {
    storeWeather: storeWeatherReducer,
  },
});
