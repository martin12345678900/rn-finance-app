import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Register"
        children={props => <RegisterScreen {...props} />}
      />
      <Stack.Screen
        name="Login"
        children={props => <LoginScreen {...props} />}
      />
    </Stack.Navigator>
  );
}
