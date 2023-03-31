import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ILocation, IWeather} from '../../shared';

interface IWeatherLocation extends IWeather, ILocation {}

interface IStoreWeatherSlice {
  weathers: IWeatherLocation[];
}

const initialState: IStoreWeatherSlice = {weathers: []};

export const storeWeatherSlice = createSlice({
  name: 'storeWeather',
  initialState,
  reducers: {
    savedWeather(state, action: PayloadAction<IWeatherLocation>) {
      console.log('action', action);
      const weatherToSave = action.payload;
      const isWeatherInArray = state.weathers.find(
        weather => weather.id === weatherToSave.id,
      );
      if (isWeatherInArray) {
        return;
      } else {
        console.log('state', state.weathers);
        state.weathers.push(action.payload);
      }
    },
  },
});

export const {savedWeather} = storeWeatherSlice.actions;

export default storeWeatherSlice.reducer;
