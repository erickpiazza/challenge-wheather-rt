import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IWeather} from '../../shared';

interface IStoreWeatherSlice {
  weathers: IWeather[];
}

const initialState: IStoreWeatherSlice = {weathers: []};

export const storeWeatherSlice = createSlice({
  name: 'storeWeather',
  initialState,
  reducers: {
    savedWeather(state, action: PayloadAction<IWeather>) {
      const weatherToSave = action.payload;
      const isWeatherInArray = state.weathers.find(
        weather => weather.id === weatherToSave.id,
      );
      if (isWeatherInArray) {
        return;
      } else {
        state.weathers.push(action.payload);
      }
    },
  },
});

export const {savedWeather} = storeWeatherSlice.actions;

export default storeWeatherSlice.reducer;
