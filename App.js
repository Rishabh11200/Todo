import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

import store from './src/redux/store';
import AllPageNavigation from './src/Navigation/allPageNavigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <AllPageNavigation />
        </PaperProvider>
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
