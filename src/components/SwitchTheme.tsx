import React from 'react';
import { View, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { Switch } from 'react-native-paper';
import { useThemeMode } from '../context/themeContext';
import { themes } from '../palette/themes';

const SwitchTheme = () => {
  const { mode, toggleMode, isDarkMode } = useThemeMode();
  const buttonTitle = isDarkMode ? 'DarkMode ON' : 'DarkMode OFF';
  //const { buttonStyle } = themes;
  const buttonContainerStyle: ViewStyle = {
    ...styles.switchContainer,
    backgroundColor: themes[mode || 'light'].button.primary,
  };
  const text: TextStyle = { color: themes[mode || 'light'].text.secondary };
  const handleSwitchToggle = () => {
    toggleMode(isDarkMode ? 'light' : 'dark');
  };

  return (
    <View style={buttonContainerStyle}>
      <Text style={{ ...styles.buttonText, ...text }}>{buttonTitle}</Text>
      <Switch
        value={isDarkMode}
        onValueChange={handleSwitchToggle}
        style={styles.switch}
      />
    </View>
  );
};

export default SwitchTheme;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 3,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    marginRight: 0,
    paddingVertical: 7,
    paddingHorizontal: 7,
  },
  switch: {
    transform: [{ scale: 0.7 }],
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
});
