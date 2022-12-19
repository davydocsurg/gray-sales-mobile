import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../utils/colors';
// import { CreateStockIcon } from '../assets/icons';

interface Props {
  onPress: any;
}

const CreateStockButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon name="plus-circle" color={colors.white} size={40} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    bottom: 20,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
});

export default CreateStockButton;
