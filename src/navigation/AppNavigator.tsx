import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { AccountIcon, CreateStockIcon, HomeIcon } from '../assets/icons';
import { RootTabParamList } from '../types';
import colors from '../utils/colors';
import AuthNavigator from './AuthNavigator';

const Tabs = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
  return <AuthNavigator />;
  //   return (
  //     <Tabs.Navigator
  //       screenOptions={({ route }) => ({
  //         tabBarActiveTintColor: colors.gray,
  //         // headerTitleStyle: { fontFamily: theme.fontFamilyBold },
  //         tabBarInactiveTintColor: colors.orange,
  //         tabBarIcon: ({ color, size }) => {
  //           if (route.name === 'Feed') {
  //             return <HomeIcon color={color} size={size} />;
  //           }

  //           if (route.name === 'CreateStock') {
  //             return <CreateStockIcon color={color} size={size} />;
  //           }

  //           if (route.name === 'Account') {
  //             return <AccountIcon color={color} size={size} />;
  //           }

  //           return null;
  //         },
  //       })}>
  //       <Tabs.Screen
  //         name="Feed"
  //         component={AuthNavigator}
  //         options={{
  //           headerShown: false,
  //           title: 'Feed',
  //         }}
  //       />
  //     </Tabs.Navigator>
  //   );
};

export default AppNavigator;
