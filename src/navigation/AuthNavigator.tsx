import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Welcome } from '../screens';
import { Login, Register } from '../screens/auth';
import colors from '../utils/colors';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerBackTitleVisible: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerBackTitleStyle: { color: colors.orange },
          headerBackTitleVisible: false,
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
