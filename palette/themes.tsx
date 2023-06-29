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
      primary: palette.button.dark,
    },
    text: {
      primary: palette.text.dark,
    },
    background: {
      primary: palette.background.dark,
    },
    border: {
      primary: palette.background.light,
    },
  },
  light: {
    button: {
      primary: palette.button.light,
    },
    text: {
      primary: palette.text.light,
    },
    background: {
      primary: palette.background.light,
    },
    border: {
      primary: palette.background.dark,
    },
  },
};
