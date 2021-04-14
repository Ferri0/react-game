import React from 'react';

const ThemeContext = React.createContext();
const themeObject = {
  theme: 'light',
  setDarkTheme() {
    themeObject.theme = 'dark';
  },
  setLightTheme() {
    themeObject.theme = 'light';
  },
};
export { ThemeContext, themeObject };
