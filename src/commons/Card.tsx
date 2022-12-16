import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import colors from '../utils/colors';
import AppText from './AppText';

export default function Card({
  title,
  description: subtitle,
  imageUrl,
  onPress,
}: {
  title: string;
  description: any;
  imageUrl?: any;
  onPress?: any;
}) {
  return (
    // <ScrollView ref={scrollView} horizontal>
    // <View style={styles.container}>
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          //   defaultSource={require('../assets/images/placeholder.png')}
          source={imageUrl}
        />
        <View style={styles.detailsContainer}>
          <AppText style={{ fontWeight: '700' }}>{title}</AppText>
          <AppText style={[styles.description]}>{subtitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    // marginHorizontal: 10,
    marginRight: 5,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    height: 110,
    width: '48%',
    // flexBasis: '50%',
  },

  image: {
    borderRadius: 10,
    width: '100%',
    height: 100,
  },

  description: {
    color: colors.secondary,
    fontWeight: 'bold',
  },

  detailsContainer: {
    padding: 20,
  },
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // flexDirection: 'row',
  },
});
