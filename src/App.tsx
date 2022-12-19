import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AuthProvider } from './contexts/AuthContext';
import { CategoryProvider } from './contexts/CategoryContext';
import { StockProvider } from './contexts/StockContext';
import { AppNavigator } from './navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <StockProvider>
        <CategoryProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </CategoryProvider>
      </StockProvider>
    </AuthProvider>
  );
};

export default App;
