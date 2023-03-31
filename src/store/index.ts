import {configureStore} from '@reduxjs/toolkit';
import storeWeatherReducer from './slice/storeWeatherReducer';

export const store = configureStore({
  reducer: {
    storeWeather: storeWeatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
