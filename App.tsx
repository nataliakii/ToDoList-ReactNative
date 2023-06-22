import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Main from './screen/Main';
import {AppProvider} from './components/appContext';

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Main />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
