import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AuthProvider } from './contexts/AuthContext';
import { AppNavigator } from './navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
