import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { AccountIcon, CreateStockIcon, HomeIcon } from '../assets/icons';
import { useAuthContext } from '../contexts/AuthContext';
import { RootTabParamList } from '../types';
import colors from '../utils/colors';
import AuthNavigator from './AuthNavigator';
import StockNavigator from './StockNavigator';

const Tabs = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
  const { authUser } = useAuthContext();

  useEffect(() => {
    console.log('====================================');
    console.log(authUser.isLoggedIn);
    console.log('====================================');
  }, []);

  if (authUser.isLoggedIn) {
    return <AuthNavigator />;
  } else {
    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.gray,
          // headerTitleStyle: { fontFamily: theme.fontFamilyBold },
          tabBarInactiveTintColor: colors.orange,
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Feed') {
              return <HomeIcon color={color} size={size} />;
            }

            if (route.name === 'CreateStock') {
              return <CreateStockIcon color={color} size={size} />;
            }

            if (route.name === 'Account') {
              return <AccountIcon color={color} size={size} />;
            }

            return null;
          },
        })}>
        <Tabs.Screen
          name="Feed"
          component={StockNavigator}
          options={{
            headerShown: false,
            title: 'Feed',
          }}
        />
      </Tabs.Navigator>
    );
  }
};

export default AppNavigator;
