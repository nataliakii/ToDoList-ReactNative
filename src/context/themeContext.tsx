import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

interface ThemeContextProps {
  mode: ColorSchemeName;
  isDarkMode: boolean;
  toggleMode: (mode: ColorSchemeName) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light',
  isDarkMode: false,
  toggleMode: () => {},
});

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({
  children,
}: ThemeContextProviderProps): ReactElement => {
  const initialAppearance = Appearance.getColorScheme() || 'light';
  const [mode, setMode] = useState<ColorSchemeName>(initialAppearance);
  const [isDarkMode, setDarkMode] = useState<boolean>(
    initialAppearance === 'dark',
  );

  const toggleMode = (appearance: ColorSchemeName): void => {
    setMode(appearance);
    setDarkMode(appearance === 'dark');
  };

  useEffect(() => {
    const initialAppearance = Appearance.getColorScheme();
    setMode(initialAppearance);
    setDarkMode(initialAppearance === 'dark');

    const changeListener = (preferences: {
      colorScheme?: ColorSchemeName;
    }): void => {
      toggleMode(preferences.colorScheme || 'light');
    };

    Appearance.addChangeListener(changeListener);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, isDarkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = (): ThemeContextProps => {
  const themeContext = useContext(ThemeContext);
  return themeContext;
};
