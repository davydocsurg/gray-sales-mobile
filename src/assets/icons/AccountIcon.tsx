import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from '.';

const AccountIcon: React.FC<IconProps> = ({ color = 'teal', size = 40 }) => {
  return (
    <Svg width={size} height={40} color={color} viewBox="0 1 511 511.999">
      <Path
        data-name="Path 217"
        d="M15 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm0 2a6 6 0 1 1-6 6 6 6 0 0 1 6-6Z"
        fillRule="evenodd"
      />
      <Path
        data-name="Path 218"
        d="M15 18.2c-5.657 0-10.558 1.175-13 2.82a3.865 3.865 0 0 0-2 3.08 3.865 3.865 0 0 0 2 3.08C4.442 28.825 9.343 30 15 30s10.558-1.175 13-2.82a3.865 3.865 0 0 0 2-3.08 3.865 3.865 0 0 0-2-3.08c-2.442-1.645-7.343-2.82-13-2.82Zm0 2a26.973 26.973 0 0 1 10.867 1.909 5.8 5.8 0 0 1 1.694 1.132 1.06 1.06 0 0 1 0 1.718 5.8 5.8 0 0 1-1.694 1.132A26.973 26.973 0 0 1 15 28a26.973 26.973 0 0 1-10.867-1.909 5.8 5.8 0 0 1-1.694-1.132 1.06 1.06 0 0 1 0-1.718 5.8 5.8 0 0 1 1.694-1.132A26.973 26.973 0 0 1 15 20.2Z"
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default AccountIcon;
