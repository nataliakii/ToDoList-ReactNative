import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Menu, Divider, Button, Portal } from 'react-native-paper';
import i18n from '../translations/i18n';
import { useThemeMode } from '../context/themeContext';
import { themes } from '../palette/themes';
import CustomTouchButton from '../components/CustomTouchButton';

const LanguageMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [language, setLanguage] = useState(i18n.locale);
  let title = language == 'en' ? 'English' : 'Українська';

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    i18n.locale = language;
    closeMenu();
  };

  const { mode } = useThemeMode();
  const { buttonStyle } = themes;

  const buttonContainerStyle: ViewStyle = {
    ...buttonStyle,
    backgroundColor: themes[mode || 'light'].button.primary,
  };
  const text: TextStyle = {
    color: themes[mode || 'light'].text.secondary,
    fontSize: themes.textSize.medium,
  };

  return (
    <View>
      <CustomTouchButton
        onPress={openMenu}
        title={title}
        style1={{ ...buttonContainerStyle, ...styles.padding }}
        style2={text}
      />
      <Portal>
        <Menu
          style={styles.menu}
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} children={undefined} />}>
          <Menu.Item
            style={text}
            onPress={() => handleLanguageChange('en')}
            title="English"
          />
          <Divider />
          <Menu.Item
            style={text}
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
  menu: {
    top: 280,
    left: 230,
  },
  padding: {
    padding: 20,
  },
});
