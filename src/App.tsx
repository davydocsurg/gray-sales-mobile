import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AuthProvider } from './contexts/AuthContext';
import { StockProvider } from './contexts/StockContext';
import { AppNavigator } from './navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <StockProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </StockProvider>
    </AuthProvider>
  );
};

export default App;
