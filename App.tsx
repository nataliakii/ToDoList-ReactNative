import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Main from './screen/Main';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppProvider as ContextProvider } from './components/appContext';

const App = () => {
  return (
    <ContextProvider>
      <PaperProvider>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <Main />
        </SafeAreaView>
      </PaperProvider>
    </ContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
