import React from 'react';
import { StyleSheet, ImageBackground, Image, View } from 'react-native';
import { AppButton } from '../commons';
import routes from '../navigation/routes';
import colors from '../utils/colors';

const Welcome: React.FC = ({ navigation }: any) => {
  return (
    <ImageBackground
      blurRadius={6}
      style={styles.background}
      source={require('../assets/images/landing-bg.jpg')}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo-white.png')}
        />
        {/* <Text style={styles.titleHead}>Gray Sales</Text> */}
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title="Login"
          color={colors.orange}
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          onPress={() => navigation.navigate(routes.REGISTER)}
          title="Register"
          color={colors.brown}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 70,
    width: 120,
    height: 120,
  },

  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  buttonsContainer: {
    width: '100%',
    padding: 20,
  },

  registerBtn: {
    width: '100%',
    height: 70,
    backgroundColor: colors.brown,
  },

  logoContainer: {
    position: 'absolute',
    top: 70,
    alignItems: 'center',
  },

  titleHead: {
    color: colors.white,
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Welcome;
