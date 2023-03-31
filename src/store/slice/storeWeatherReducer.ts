import {createSlice} from '@reduxjs/toolkit';

export const storeWeatherReducer = createSlice({
  name: 'storeWeather',
  initialState: {
    value: 0,
  },
  reducers: {
    saved: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('redux>>>', state.value);
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {saved} = storeWeatherReducer.actions;

export default storeWeatherReducer.reducer;
