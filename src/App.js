import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import CoreRoutes from './routes/Core.route';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './config/redux/Store.redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar backgroundColor={'black'} />
          <CoreRoutes />
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
