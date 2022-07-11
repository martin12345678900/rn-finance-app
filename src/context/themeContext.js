import React, { createContext, useState, useContext } from 'react';
import { Light as LightTheme, Dark as DarkTheme } from '../themes';

const ThemeContext = createContext({
  theme: LightTheme,
  changeTheme: () => {},
});

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

export const useTheme = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return { theme, changeTheme };
};
