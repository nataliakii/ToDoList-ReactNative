/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, Image, StyleSheet, Alert } from 'react-native';
import FlatListData from '../components/FlatListData';
import LINK from '../config';
import { AppContext } from '../components/appContext';
import i18n from '../text/i18n';
import LanguageMenu from '../components/LanguageMenu';

const Main = () => {
  const { number, setNumber, addTodos } = useContext(AppContext);

  //Displaying 5 default tasks once on first this component loads
  useEffect(() => {
    addTodos(number);
  }, []);

  const handleSubmit = () => {
    if (isNaN(number) || 0) {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: LINK,
          }}
          style={styles.headerImage}
        />
        <View style={styles.languageMenuContainer}>
          <LanguageMenu />
        </View>
        <Text style={styles.headerText}>{i18n.t('main.header')}</Text>
        <TextInput
          style={styles.input}
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
    borderWidth: 1,
    borderColor: '#BF1769',
  },
  header: {
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#BF1769',
  },
  headerImage: {
    width: 400,
    height: 200,
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#BF1769',
  },
  languageMenuContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});
