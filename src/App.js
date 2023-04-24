import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import CoreRoutes from './routes/Core.route';
import {StatusBar} from 'react-native';

function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar backgroundColor={'black'} />
        <CoreRoutes />
      </NavigationContainer>
    </>
  );
}

export default App;
