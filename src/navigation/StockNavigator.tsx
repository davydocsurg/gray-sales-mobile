import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StockDetails, Stocks } from '../screens/stocks';

const Stock = createStackNavigator();

const StockNavigator = () => {
  return (
    <Stock.Navigator>
      <Stock.Screen name="Stocks" component={Stocks} />
      <Stock.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stock.Screen
          name="Stock Details"
          component={StockDetails}
          options={{ headerShown: false }}
        />
      </Stock.Group>
    </Stock.Navigator>
  );
};

export default StockNavigator;
