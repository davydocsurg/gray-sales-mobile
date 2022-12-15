import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingIndicator = ({ visible = false }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        // ref={animation}
        style={styles.lottie}
        loop
        source={require('../assets/animations/loader.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    opacity: 0.8,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default LoadingIndicator;
