import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import SearchLocationScreen from '../../src/screens/SearchLocationScreen';
import api from '../../src/api/axios';
import {act} from 'react-test-renderer';

const locations = [
  {
    country: 'BR',
    lat: -22.8217964,
    lon: -47.267105,
    name: 'Sumaré',
    state: 'São Paulo',
  },
  {
    country: 'ID',
    lat: -2.6783103,
    lon: 118.8000651,
    name: 'Sumare',
    state: 'West Sulawesi',
  },
];

jest.mock('../../src/api/axios');

describe('SearchLocationScreen', () => {
  it('test', () => {
    const response = {data: locations};
    (api.get as jest.MockedFunction<typeof api.get>).mockResolvedValueOnce(
      response,
    );

    // axios.get.mockResolvedValue({data: locations});
    render(<SearchLocationScreen />);
    const inputSearch = screen.getByTestId('INPUT_SEARCH_LOCATION');
    console.log('inputSearch', inputSearch);
    // act(() => {
    //   fireEvent.changeText(
    //     screen.getByTestId('INPUT_SEARCH_LOCATION'),
    //     'Sumaré',
    //   );
    // });
  });
});
