import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Main from './screen/Main';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppProvider as ContextProvider } from './context/appContext';
import { ThemeProvider } from './context/themeContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from './screen/Settings';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ContextProvider>
        <ThemeProvider>
          <PaperProvider>
            <SafeAreaView style={styles.safeArea}>
              <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Settings" component={Settings} />
              </Stack.Navigator>
            </SafeAreaView>
          </PaperProvider>
        </ThemeProvider>
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
