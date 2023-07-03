import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Menu, Divider, Button, Portal } from 'react-native-paper';
import i18n from '../translations/i18n';
import { useThemeMode } from '../context/themeContext';
import { themes } from '../palette/themes';

const LanguageMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  let str = i18n.locale == 'en' ? 'English' : 'Українська';

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLanguageChange = (language: string) => {
    i18n.locale = language;
    closeMenu();
  };

  const { mode } = useThemeMode();
  const { buttonStyle } = themes;

  const buttonContainerStyle: ViewStyle = {
    ...buttonStyle,
    backgroundColor: themes[mode || 'light'].button.primary,
  };
  const text: TextStyle = { color: themes[mode || 'light'].text.primary };

  return (
    <View style={{ ...buttonContainerStyle, ...text }}>
      <Button onPress={openMenu}>{str}</Button>
      <Portal>
        <Menu
          style={styles.menu}
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} children={undefined} />}>
          <Menu.Item
            style={{ ...styles.menuItem, ...text }}
            onPress={() => handleLanguageChange('en')}
            title="English"
          />
          <Divider />
          <Menu.Item
            style={{ ...styles.menuItem, ...text }}
            onPress={() => handleLanguageChange('ua')}
            title="Українська"
          />
        </Menu>
      </Portal>
    </View>
  );
};

export default LanguageMenu;

const styles = StyleSheet.create({
  menuItem: {
    paddingVertical: -10,
  },
  menu: {
    top: 60,
    left: 130,
  },
});
