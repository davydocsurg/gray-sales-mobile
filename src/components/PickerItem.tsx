import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import AppText from '../commons/AppText';

export default function PickerItem({ item, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppText style={styles.text}>{item.label}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});
