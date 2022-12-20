import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AccountSetting, AuthUserStocks } from '../screens/profile';

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account Setting" component={AccountSetting} />
      <Stack.Screen name="My Stocks" component={AuthUserStocks} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
