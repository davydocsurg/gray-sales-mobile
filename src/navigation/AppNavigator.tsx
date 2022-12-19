import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// locals
import { CreateStockIcon, HomeIcon } from '../assets/icons';
import { useAuthContext } from '../contexts/AuthContext';
import { AddStock } from '../screens/stocks';
import { RootTabParamList } from '../types';
import colors from '../utils/colors';
import AccountNavigator from './AccountNavigator';
import AuthNavigator from './AuthNavigator';
import CreateStockButton from './CreateStockButton';
import StockNavigator from './StockNavigator';

const Tabs = createBottomTabNavigator<RootTabParamList>();

const AppNavigator = () => {
  const { authUser } = useAuthContext();

  useEffect(() => {
    console.log('====================================');
    console.log(authUser.isLoggedIn);
    console.log('====================================');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authUser.isLoggedIn) {
    return <AuthNavigator />;
  } else {
    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.orange,
          // headerTitleStyle: { fontFamily: theme.fontFamilyBold },
          tabBarInactiveTintColor: colors.brown,
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Feed') {
              return <HomeIcon color={color} size={size} />;
            }

            if (route.name === 'CreateStock') {
              return <CreateStockIcon color={color} size={size} />;
            }

            if (route.name === 'Account') {
              return <Icon name="account-outline" size={size} color={color} />;
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

        <Tabs.Screen
          name="CreateStock"
          component={AddStock}
          options={
            // ({ headerShown: false, title: 'Create Stock' },
            ({ navigation }) => ({
              // headerShown: false,
              title: 'Create Stock',
              tabBarButton: () => (
                <CreateStockButton
                  onPress={() => navigation.navigate('CreateStock')}
                />
              ),
            })
          }
        />

        <Tabs.Screen
          name="Account"
          component={AccountNavigator}
          options={{
            headerShown: false,
            headerTitle: 'Account Settings',
          }}
        />
      </Tabs.Navigator>
    );
  }
};

export default AppNavigator;
