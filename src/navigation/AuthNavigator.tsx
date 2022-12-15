import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Welcome } from '../screens';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
