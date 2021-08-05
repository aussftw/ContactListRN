import React from 'react';
import AppNavigationContainer from './src/navigatrion/index';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigationContainer />
    </Provider>
  );
};

export default App;
