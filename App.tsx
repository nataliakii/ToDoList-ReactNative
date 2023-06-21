import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ToDo = () => {
  const [todoListData, setTodoListData] = useState<
    {id: number; title: string; done: boolean}[]
  >([]);
  const [number, setNumber] = useState(5);

  //functuon that creates a new todo list according to the user's input
  const addToDos = (num: number) => {
    const newData = [];
    for (let i = 0; i < num; i++) {
      const obj = {
        id: i + 1,
        title: `Task number ${i + 1}`,
        done: false,
      };
      newData.push(obj);
    }
    return setTodoListData(newData);
  };

  //Displaying 5 default tasks once on first this component loads
  useState(() => {
    addToDos(number);
  }, []);

  const handleCheckboxPress = (item: { id: number; done: boolean }) => {
    item.done = !item.done;
    setTodoListData([...todoListData].sort((a, b) => (a.done === b.done ? 0 : a.done ? -1 : 1)));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
            }}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>Your todos</Text>
          <TextInput
            placeholder="Type in how many todos do you want?"
            onChangeText={newNum => setNumber(Number(newNum))}
            onSubmitEditing={() => addToDos(number)}
          />
        </View>
        <FlatList
          data={todoListData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.taskItem}>
              <BouncyCheckbox
                size={25}
                fillColor="#BF1769"
                unfillColor="#FFFFFF"
                text={item.title}
                iconStyle={{borderColor: '#BF1769'}}
                innerIconStyle={{borderWidth: 2}}
                onPress={(isChecked: boolean) => handleCheckboxPress(item)}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#BF1769',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
