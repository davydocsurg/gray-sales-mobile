import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';

interface ButtonProps {
  title: string;
  color: string;
  onPress: any;
  icon?: any;
  width?: string;
}

export default function AppButton({
  title,
  color,
  onPress,
  icon,
  width = '100%',
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color, width: width }]}
      onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.text}>{title}</Text>
        {icon && <Icon color={colors.white} name={icon} size={25} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    borderRadius: 25,
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
  },

  text: {
    color: colors.white,
    fontSize: 17,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
