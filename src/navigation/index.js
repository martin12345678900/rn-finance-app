import React, { useState } from 'react';
import AuthNavigator from './authNavigator';
import AppNavigator from './appNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../context/themeContext';
import { Dark as DarkTheme, Light as LightTheme } from '../themes';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme === 'light' ? LightTheme : DarkTheme}>
      {!isLoggedIn ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
