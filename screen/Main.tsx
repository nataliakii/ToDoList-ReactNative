/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Text, TextInput, View, Image, StyleSheet, Alert} from 'react-native';
import FlatListData from '../components/FlatListData';
import LINK from '../config';
import {AppContext} from '../components/appContext';

const Main = () => {
  const {number, setNumber, addTodos} = useContext(AppContext);

  //Displaying 5 default tasks once on first this component loads
  useEffect(() => {
    addTodos(number);
  }, []);

  const handleSubmit = () => {
    if (isNaN(number) || 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number.');
    } else {
      Alert.alert(`Now you have ${number} tasks`, 'Congrads!');
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
        <Text style={styles.headerText}>Type-in number of tasks</Text>
        <TextInput
          style={styles.input}
          value={number}
          placeholder="This input is  for number"
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
    borderBottomWidth: 3,
    borderBottomColor: '#BF1769',
  },
});
