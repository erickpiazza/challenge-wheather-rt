import React from 'react';
import WeatherDetails from './screens/WeatherDetails';

function App(): JSX.Element {
  return <WeatherDetails coord={{lat: -22.9056, lon: -47.0608}} />;
}

export default App;

// {lat: -22.9056, lon: -47.0608}
