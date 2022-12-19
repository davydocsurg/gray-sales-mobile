import IconType from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View } from 'react-native';

export default function Icon({
  size = 40,
  name,
  backgroundColor = '#000',
  iconColor = '#fff',
}: {
  size?: number;
  name: any;
  backgroundColor?: string;
  iconColor?: string;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <IconType name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}
