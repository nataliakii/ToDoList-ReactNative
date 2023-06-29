import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import Main from './screen/Main';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppProvider as ContextProvider } from './components/appContext';
import { ThemeProvider, useThemeMode } from './components/themeContext';
import { themes } from './palette/themes';

const App = () => {
  const { mode, isDarkMode } = useThemeMode();
  const backgroundColor = themes[mode || 'light'].background.primary;

  return (
    <ThemeProvider>
      <ContextProvider>
        <PaperProvider>
          <SafeAreaView style={{ ...styles.safeArea, backgroundColor }}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <Main />
          </SafeAreaView>
        </PaperProvider>
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
