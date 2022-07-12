import React, { useState } from 'react';

import AuthNavigator from './authNavigator';
import AppNavigator from './appNavigator';
import { NavigationContainer } from '@react-navigation/native';

import { useTheme } from '../context/themeContext';
import { Dark as DarkTheme, Light as LightTheme } from '../themes';

import UserContextProvider, { useUser } from '../context/userContext';

const Navigation = () => {
  const { theme } = useTheme();
  const { isLoggedIn } = useUser();

  return (
    <NavigationContainer theme={theme === 'light' ? LightTheme : DarkTheme}>
      {!isLoggedIn ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
