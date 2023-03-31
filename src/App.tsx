import React from 'react';
import {Provider} from 'react-redux';
import {RootNavigation} from './navigation';
import {store} from './store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}

export default App;
