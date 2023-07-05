import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import LanguageMenu from '../components/LanguageMenu';
import SwitchTheme from '../components/SwitchTheme';
import { useThemeMode } from '../context/themeContext';
import { themes } from '../palette/themes';
import i18n from '../translations/i18n';

const Settings = () => {
  const { mode } = useThemeMode();
  const background: ViewStyle = {
    backgroundColor: themes[mode || 'light'].background.primary,
  };
  const text = {
    color: themes[mode || 'light'].text.primary,
    fontSize: themes.textSize.medium,
  };
  return (
    <View style={{ ...styles.container, ...background }}>
      <Text style={{ ...styles.text, ...text }}>{i18n.t('main.setPage')}</Text>
      <View style={styles.centeredContent}>
        <LanguageMenu />
        <SwitchTheme />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    marginBottom: 20,
  },
  centeredContent: {
    //flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
