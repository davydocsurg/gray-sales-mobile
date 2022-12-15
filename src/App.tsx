import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AppNavigator } from './navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
