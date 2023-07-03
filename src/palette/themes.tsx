import { palette } from './palette';

export const themes = {
  buttonStyle: {
    padding: 3,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dark: {
    button: {
      primary: palette.summerGreen,
    },
    text: {
      primary: palette.white,
      secondary: palette.white,
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
    },
    background: {
      primary: palette.white,
    },
    border: {
      primary: palette.summerGreen,
    },
  },
};
