import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import { useTheme } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AuthNavigator({ changeLoginStatus }) {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.boxBackground }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Register"
          children={props => <RegisterScreen {...props} />}
        />
        <Stack.Screen
          name="Login"
          children={props => (
            <LoginScreen {...props} changeLoginStatus={changeLoginStatus} />
          )}
        />
      </Stack.Navigator>
    </View>
  );
}
