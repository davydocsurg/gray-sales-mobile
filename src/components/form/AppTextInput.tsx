import Icon from 'react-native-vector-icons/FontAwesome';

import React from 'react';
import { TextInputProps } from 'react-native';
import { View, StyleSheet, TextInput } from 'react-native';

import defaultStyles from '../../utils/styles';

interface Props extends TextInputProps {
  icon?: any;
  width?: string;
}

const AppTextInput: React.FC<Props> = ({ icon, width = '100%', ...rest }) => {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.text}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
