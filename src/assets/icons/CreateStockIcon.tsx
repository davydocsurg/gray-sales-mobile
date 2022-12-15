import React from 'react';
import { Path, Svg } from 'react-native-svg';
import type { IconProps } from '.';

const CreateStockIcon: React.FC<IconProps> = ({
  color = 'teal',
  size = 40,
}) => {
  return (
    <Svg width={size} height={40} viewBox="0 1 511 511.999" fill={color}>
      <Path d="M41.267 18.557H26.832V4.134A4.127 4.127 0 0 0 22.707 0a4.126 4.126 0 0 0-4.124 4.135v14.432H4.141a4.137 4.137 0 0 0-4.138 4.135 4.143 4.143 0 0 0 1.207 2.934 4.122 4.122 0 0 0 2.92 1.222h14.453V41.27c0 1.142.453 2.176 1.201 2.922a4.11 4.11 0 0 0 2.919 1.211 4.13 4.13 0 0 0 4.129-4.133V26.857h14.435c2.283 0 4.134-1.867 4.133-4.15-.001-2.282-1.852-4.15-4.133-4.15z" />
    </Svg>
  );
};

export default CreateStockIcon;
