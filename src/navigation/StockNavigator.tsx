import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Stocks } from '../screens/stocks';

const Stock = createStackNavigator();

const StockNavigator = () => {
  return (
    <Stock.Navigator>
      <Stock.Screen name="Stocks" component={Stocks} />
    </Stock.Navigator>
  );
};

export default StockNavigator;
