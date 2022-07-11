import 'react-native-gesture-handler';
import React from 'react';

import ThemeContextProvider from './src/context/themeContext';
import Navigation from './src/navigation';

export default function App() {
  return (
    <ThemeContextProvider>
      <Navigation />
    </ThemeContextProvider>
  );
}
