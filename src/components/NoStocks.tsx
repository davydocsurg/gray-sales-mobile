import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Screen from './Screen';

const NoStocks = () => {
  return (
    <Screen style={styles.emptyStockContainer}>
      <Icon
        name="flask-empty-minus-outline"
        size={60}
        color={colors.orange}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyStock}>No Stocks found!</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  emptyStockContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  emptyStock: {
    color: colors.brown,
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  emptyIcon: {
    alignSelf: 'center',
  },
});

export default NoStocks;
