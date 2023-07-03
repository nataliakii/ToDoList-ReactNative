import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Main from './screen/Main';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppProvider as ContextProvider } from './context/appContext';
import { ThemeProvider } from './context/themeContext';

const App = () => {
  return (
    <ThemeProvider>
      <ContextProvider>
        <PaperProvider>
          <SafeAreaView style={styles.safeArea}>
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
