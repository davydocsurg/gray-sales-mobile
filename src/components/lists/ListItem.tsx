import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AppText from '../../commons/AppText';
import colors from '../../utils/colors';

export default function ListItem({
  image,
  title,
  subTitle,
  listAction,
  renderActions,
  IconComponent,
  borderRadius = 35,
  icon = 'chevron-right',
}: {
  image?: any;
  title: string;
  subTitle?: string;
  listAction?: any;
  renderActions?: any;
  IconComponent?: any;
  borderRadius?: number;
  icon?: symbol | Function | any;
}) {
  return (
    <Swipeable renderRightActions={renderActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={listAction}>
        <View style={styles.container}>
          {IconComponent}
          {image && (
            <Image
              style={[styles.image, { borderRadius: borderRadius }]}
              source={image}
            />
          )}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </AppText>
            )}
          </View>
          <Icon color={colors.medium} name={icon} size={25} />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: '500',
  },
});
