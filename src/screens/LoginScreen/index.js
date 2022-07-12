import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useFormState, Form } from 'react-native-use-form';
import { TextInput, Button, HelperText } from 'react-native-paper';

import { useTheme } from '@react-navigation/native';

function looksLikeMail(email) {
  let lastAtPos = email.lastIndexOf('@');
  let lastDotPos = email.lastIndexOf('.');
  return (
    lastAtPos < lastDotPos &&
    lastAtPos > 0 &&
    email.indexOf('@@') === -1 &&
    lastDotPos > 2 &&
    email.length - lastDotPos > 2
  );
}

export default function LoginScreen({ navigation, changeLoginStatus }) {
  const theme = useTheme();

  const [
    { errors, submit, formProps, hasError },
    { email, password, username },
  ] = useFormState(
    {
      email: '',
      password: '',
      username: '',
    },
    {
      onChange: latestValues => {
        //console.log(latestValues);
      },
      onSubmit: submittedValues => {
        console.log(submittedValues);
        changeLoginStatus(true);
      },
    },
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../../assets/images/user-image.png')}
        style={{
          width: 150,
          height: 150,
          marginBottom: 50,
          alignSelf: 'center',
        }}
      />
      <Form {...formProps}>
        <TextInput
          mode="outlined"
          label="Email"
          error={hasError('email')}
          {...email('email', {
            validate: email => {
              const isEmailValid = looksLikeMail(email);
              return isEmailValid || 'email is invalid';
            },
          })}
          style={{ borderColor: 'black' }}
        />
        <HelperText type="error" visible={hasError('email')}>
          {errors.email}
        </HelperText>
        <TextInput
          mode="outlined"
          label="Username"
          error={hasError('username')}
          {...username('username', {
            required: true,
            minLength: 6,
          })}
          style={{ borderColor: 'black' }}
        />
        <HelperText type="error" visible={hasError('username')}>
          {errors.username}
        </HelperText>
        <TextInput
          mode="outlined"
          label="Password"
          error={hasError('password')}
          {...password('password', {
            required: true,
            minLength: 6,
            maxLength: 20,
          })}
          style={{ borderColor: 'black' }}
        />
        <HelperText type="error" visible={hasError('password')}>
          {errors.password}
        </HelperText>
        <Button
          mode="contained"
          onPress={submit}
          style={{
            backgroundColor: theme.colors.boxBackground,
            padding: 5,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: theme.colors.text2,
            }}>
            Login
          </Text>
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Register')}
          style={{
            backgroundColor: 'transparent',
            padding: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: theme.colors.text2,
              textTransform: 'none',
            }}>
            Create New Account
          </Text>
        </Button>
      </Form>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 60,
  },
});
