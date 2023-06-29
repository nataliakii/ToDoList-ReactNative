import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Switch } from 'react-native-paper';
import { useThemeMode } from '../components/themeContext';
import { themes } from '../palette/themes';

const SwitchTheme = () => {
  const { mode, toggleMode, isDarkMode } = useThemeMode();
  const buttonTitle = isDarkMode ? 'DarkMode ON' : 'DarkMode OFF';
  const { buttonStyle } = themes;
  const buttonContainerStyle = {
    ...styles.switchContainer,
    ...buttonStyle,
    backgroundColor: themes[mode || 'light'].button.primary,
    color: themes[mode || 'light'].text.primary,
  };
  const text = { color: themes[mode || 'light'].text.primary };

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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
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
