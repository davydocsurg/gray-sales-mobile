import React, { useState } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { Screen } from 'react-native-screens';
import * as Yup from 'yup';

import { LoadingIndicator } from '../../components';
import { AppForm, AppFormField, SubmitButton } from '../../components/form';
import routes from '../../navigation/routes';
import { LoginFields } from '../../types';
import colors from '../../utils/colors';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
});

const Login = ({ navigation }: any) => {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (values: LoginFields, { resetForm }: any) => {
    setProgress(1);
    // handleLogin(values);

    // if (authUser.errors) {
    //   return Alert.alert(`${authUser?.errors}`);
    // }

    // if (authUser.isLoggedIn) {
    //   setUploadVisible(true);
    //   // setTimeout(() => {
    //   //     navigation.navigate(routes.FEED);
    //   // }, 6000);
    // }
    // return resetForm();
  };

  return (
    <>
      <LoadingIndicator visible={false} />
      <Screen style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-orange.png')}
        />
        <AppForm
          initialValues={{ email: '', password: '' }}
          onSubmit={(values: LoginFields, formikBag: Object) =>
            handleSubmit(values, formikBag)
          }
          validationSchema={validationSchema}>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="user"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />

          <SubmitButton color={colors.orange} title="Login" />
        </AppForm>

        <Text style={styles.registerMsg}>
          <Text>Don't have an account? </Text>
          <Text
            onPress={() => navigation.navigate(routes.REGISTER)}
            style={styles.registerLink}>
            Register
          </Text>
        </Text>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  registerMsg: {
    color: colors.dark,
    marginTop: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 18,
  },
  registerLink: {
    color: colors.orange,
    fontSize: 20,
  },
});

export default Login;
