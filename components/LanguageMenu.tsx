import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Divider, Button, Portal } from 'react-native-paper';
import i18n from '../text/i18n';

const LanguageMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  str = i18n.locale == 'en' ? 'English' : 'Українська';

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

  return (
    <View style={styles.menuBar}>
      <Button onPress={openMenu}>{str}</Button>

      {/* Simple Small Menu */}
      <Portal>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} children={undefined} />}>
          <Menu.Item
            style={styles.modalContainer}
            onPress={() => handleLanguageChange('en')}
            title="English"
          />
          <Divider />
          <Menu.Item
            style={styles.modalContainer}
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
  menuBar: {
    backgroundColor: '#ffffff',
    padding: 3,
    borderRadius: 100,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: -10,
  },
});
