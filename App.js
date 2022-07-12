import 'react-native-gesture-handler';
import React from 'react';

import ThemeContextProvider from './src/context/themeContext';
import Navigation from './src/navigation';
import UserContextProvider from './src/context/userContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <Navigation />
      </UserContextProvider>
    </ThemeContextProvider>
  );
}
