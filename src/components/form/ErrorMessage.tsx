import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../../commons/AppText';

const ErrorMessage = ({ error, visible }: any) => {
  if (!visible || !error) {
    return null;
  }

  return <AppText style={styles.error}>{error}</AppText>;
};

const styles = StyleSheet.create({
  error: { color: 'red' },
});

export default ErrorMessage;
