import React, { useState } from 'react';
import AuthNavigator from './authNavigator';
import AppNavigator from './appNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../context/themeContext';
import { Dark as DarkTheme, Light as LightTheme } from '../themes';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme } = useTheme();

  const changeLoginStatus = status => {
    if (typeof status === 'boolean') setIsLoggedIn(status);
  };

  return (
    <NavigationContainer theme={theme === 'light' ? LightTheme : DarkTheme}>
      {!isLoggedIn ? (
        <AuthNavigator
          isLoggedIn={isLoggedIn}
          changeLoginStatus={changeLoginStatus}
        />
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
