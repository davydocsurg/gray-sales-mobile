import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
// import { Navigation } from 'react-native-navigation';

// const { statusBarHeight } = Navigation.constantsSync();

export default function Screen({
  children,
  style,
}: {
  children: JSX.Element | JSX.Element[];
  style?: any;
}) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[style, styles.view]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
