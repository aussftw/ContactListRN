import {
  BaseTheme,
  createBox,
  createTheme,
  createText,
  useTheme as useReTheme,
} from '@shopify/restyle';

export const theme: BaseTheme = createTheme({
  colors: {
    primary: '#2cb9b0',
    primaryLight: '#e7f9f7',
    secondary: '#0C0d34',
    danger: '#FF0058',
    text: 'rgba(12, 13, 52, 0.5)',
    white: 'white',
    lightGrey: '#FAFAFA',
    grey: 'rgba(12, 13, 52, 0.05)',
    darkGrey: '#8A8D90',
    orange: '#FE5E33',
    yellow: '#FFC641',
    pink: '#FF87A2',
    violet: '#442CB9',
    black: '#000',
    lightBlue: '#BFEAF5',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {},
  borderRadiuses: {
    s: 4,
    m: 10,
    l: 40,
    xl: 75,
  },

  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      color: 'white',
      textAlign: 'center',
    },
    title1: {
      fontSize: 24,
      color: 'secondary',
    },
    title2: {
      fontSize: 28,
      lineHeight: 33,
      fontWeight: '600',
      color: 'secondary',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'text',
    },
    button: {
      fontSize: 15,
      linehHeight: 24,
      color: 'text',
    },
    nav: {
      fontSize: 20,
      lineHeight: 28,
      fontWeught: '600',
      color: 'secondary',
    },
  },
});

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export type Theme = typeof theme;
export const useTheme = () => useReTheme<Theme>();
