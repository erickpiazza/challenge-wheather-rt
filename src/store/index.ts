import {configureStore} from '@reduxjs/toolkit';
import storeWeatherSlice from './slice/storeWeatherSlice';

export const store = configureStore({
  reducer: {
    storeWeather: storeWeatherSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
