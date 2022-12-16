import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { Screen } from 'react-native-screens';
import * as Yup from 'yup';

import { LoadingIndicator } from '../../components';
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from '../../components/form';
import { useAuthContext } from '../../contexts/AuthContext';
import routes from '../../navigation/routes';
import { LoginFields, RegisterFields } from '../../types';
import colors from '../../utils/colors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label('Name'),
  // lastName: Yup.string().required().min(3).label("Last Name"),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password'),
  passwordConfirmation: Yup.string()
    .required()
    .min(8)
    .label('Confirm Password'),
});

const Register = ({ navigation }: any) => {
  const { authUser, registered, handleRegister } = useAuthContext();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: RegisterFields, { resetForm }: any) => {
    setSubmitting(true);
    handleRegister(values);

    if (authUser.errors.length > 0) {
      setSubmitting(false);
      return Alert.alert(`${authUser?.errors}`);
    }

    if (registered) {
      setSubmitting(false);
      setTimeout(() => {
        navigation.navigate(routes.LOGIN);
      }, 6000);
    }
    return resetForm();
  };

  return (
    <>
      <LoadingIndicator visible={submitting} />
      <ScrollView>
        <Screen style={styles.container}>
          <LoadingIndicator visible={false} />

          <Image
            style={styles.logo}
            source={require('../../assets/images/logo-orange.png')}
          />

          <Form
            initialValues={{
              name: '',
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values: RegisterFields, formikBag: Object) =>
              handleSubmit(values, formikBag)
            }>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="user"
              keyboardType="default"
              name="name"
              placeholder="Name"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="user"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />

            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              secureTextEntry
              textContentType="password"
            />

            <SubmitButton color={colors.orange} title="register" />
          </Form>

          <Text style={styles.registerMsg}>
            <Text>Already have an account? </Text>
            <Text
              onPress={() => navigation.navigate(routes.LOGIN)}
              style={styles.registerLink}>
              Login
            </Text>
          </Text>
        </Screen>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // zIndex: 1,
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

export default Register;
