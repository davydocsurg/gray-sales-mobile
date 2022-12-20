import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AccountSetting } from '../screens/profile';

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account Setting" component={AccountSetting} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
