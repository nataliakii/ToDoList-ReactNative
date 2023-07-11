import { palette } from './palette';

export const themes = {
  buttonStyle: {
    padding: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSize: {
    big: 40,
    medium: 26,
    small: 19,
    xs: 13,
  },
  dark: {
    button: {
      primary: palette.summerGreen,
    },
    text: {
      primary: palette.white,
      secondary: palette.white,
      b: palette.black,
    },
    background: {
      primary: palette.summerGreen,
    },
    border: {
      primary: palette.white,
    },
  },
  light: {
    button: {
      primary: palette.redViolet,
    },
    text: {
      primary: palette.redViolet,
      secondary: palette.white,
      b: palette.black,
    },
    background: {
      primary: palette.white,
    },
    border: {
      primary: palette.summerGreen,
    },
  },
};
