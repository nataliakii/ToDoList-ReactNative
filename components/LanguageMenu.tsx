import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Divider, Button, Portal } from 'react-native-paper';
import i18n from '../text/i18n';
import { useThemeMode } from '../components/themeContext';
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

  const buttonContainerStyle = {
    ...buttonStyle,
    backgroundColor: themes[mode || 'light'].button.primary,
    color: themes[mode || 'light'].text.primary,
    justifyContent: 'center',
    alignItems: 'center',
  };
  const text = { color: themes[mode || 'light'].text.primary };

  return (
    <View style={buttonContainerStyle}>
      <Button onPress={openMenu}>{str}</Button>
      <Portal>
        <Menu
          style={styles.menu}
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} children={undefined} />}>
          <Menu.Item
<<<<<<< Updated upstream
            style={{ ...styles.menuItem, text }}
=======
            style={{ ...styles.menuItem, ...text }}
>>>>>>> Stashed changes
            onPress={() => handleLanguageChange('en')}
            title="English"
          />
          <Divider />
          <Menu.Item
<<<<<<< Updated upstream
            style={{ ...styles.menuItem, text }}
=======
            style={{ ...styles.menuItem, ...text }}
>>>>>>> Stashed changes
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
  }
});
