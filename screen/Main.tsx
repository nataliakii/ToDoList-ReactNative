import React, { useContext, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import FlatListData from '../components/FlatListData';
import LINK from '../config';
import { AppContext } from '../components/appContext';
import i18n from '../text/i18n';
import LanguageMenu from '../components/LanguageMenu';
import SwitchTheme from '../components/SwitchTheme';
import { useThemeMode } from '../components/themeContext';
import { themes } from '../palette/themes';

const Main = () => {
  const { number, setNumber, addTodos } = useContext(AppContext);
  const { mode } = useThemeMode();
  // Displaying 5 default tasks once on first this component loads
  useEffect(() => {
    addTodos(number);
  }, []);

  const background = {
    backgroundColor: themes[mode || 'light'].background.primary,
  };
  const border = {
    borderColor: themes[mode || 'light'].border.primary,
  };
  const borderBottom = {
    borderBottomColor: themes[mode || 'light'].border.primary,
  };
  const text = { color: themes[mode || 'light'].text.primary };

  const handleSubmit = () => {
    if (isNaN(number) || number === 0) {
      Alert.alert(i18n.t('main.alert1'), i18n.t('main.alert2'));
    } else {
      Alert.alert(
        i18n.t('main.alert3', { number: number }),
        i18n.t('main.alert5'),
      );
      addTodos(number);
    }
  };

  return (
    <View style={{ ...styles.container, ...background }}>
      <View style={{ ...styles.header, ...borderBottom }}>
        <Image
          source={{
            uri: LINK,
          }}
          style={styles.headerImage}
        />
        <View style={styles.languageMenuContainer}>
          <LanguageMenu />
          <SwitchTheme />
        </View>
        <Text style={{ ...styles.headerText, ...borderBottom, ...text }}>
          {i18n.t('main.header')}
        </Text>
        <TextInput
          style={{ ...styles.input, ...border }}
          value={number}
          placeholder={i18n.t('main.placeholder')}
          onChangeText={newNum => setNumber(Number(newNum))}
          onBlur={() => handleSubmit()}
          autoFocus
          clearTextOnFocus
        />
      </View>
      <FlatListData />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 30,
    width: 200,
    margin: 6,
    paddingHorizontal: 20,
    paddingVertical: Platform.select({
      ios: 0,
      android: 0,
    }),
    borderWidth: 1,
  },
  header: {
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 3,
  },
  headerImage: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height / 5) * 1.618,
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
  },
  languageMenuContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});
