import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, Divider, Button } from 'react-native-paper';
import I18n from 'react-native-i18n';

const LanguageMenu = () => {
  const [visible, setVisible] = useState(false);
  console.log( I18n );

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLanguageChange = (language: string) => {
    I18n.locale = language;
    closeMenu();
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu}>
            {I18n.locale === 'en' ? 'English' : 'Українська'}
          </Button>
        }>
        <Menu.Item onPress={() => handleLanguageChange('en')} title="English" />
        <Divider />
        <Menu.Item
          onPress={() => handleLanguageChange('ua')}
          title="Українська"
        />
      </Menu>
    </View>
  );
};

export default LanguageMenu;
