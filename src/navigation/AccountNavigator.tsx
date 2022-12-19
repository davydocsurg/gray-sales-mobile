import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Account } from '../screens/profile';

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
