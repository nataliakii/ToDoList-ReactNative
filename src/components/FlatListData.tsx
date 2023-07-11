import React, { useState, useContext } from 'react';
import {
  TextInput,
  View,
  FlatList,
  StyleSheet,
  Alert,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Checkbox from './Checkbox';
import { AppContext } from '../context/appContext';
import i18n from '../translations/i18n';
import { useThemeMode } from '../context/themeContext';
import { themes } from '../palette/themes';
import CustomTouchButton from './CustomTouchButton';
import CustomIconButton from './CustomIconButton';

const FlatListRender: React.FC = () => {
  const {
    todoListData,
    setTodoListData,
    deleteTask,
    token,
    toggleDone,
    editTitle,
  } = useContext(AppContext);
  const { mode } = useThemeMode();
  const border: ViewStyle = {
    borderBottomColor: themes[mode || 'light'].border.primary,
  };
  const text: TextStyle = {
    color: themes[mode || 'light'].text.primary,
    fontSize: themes.textSize.small,
  };

  const [editingItemId, setEditingItemId] = useState('');
  const [editingItemText, setEditingItemText] = useState('');

  const handleDeleteTask = (_id: string, title: string) => {
    Alert.alert(
      i18n.t('flat-list.alert1'),
      i18n.t('flat-list.alert2', { title: title }),
      [
        {
          text: i18n.t('flat-list.alert3'),
          style: 'cancel',
        },
        { text: i18n.t('flat-list.alert4'), onPress: () => deleteTask(_id) },
      ],
    );
  };

  const handleEditStart = (itemId: string, currentText: string) => {
    setEditingItemId(itemId);
    setEditingItemText(currentText);
  };

  const handleEditSave = (taskId: string) => {
    editTitle(editingItemText, taskId);
    setEditingItemId('');
    setEditingItemText('');
  };

  const handleCheckboxPress = (
    item: { _id: string; done: boolean; title: string },
    isChecked: boolean,
  ) => {
    item.done = isChecked;
    toggleDone(isChecked, item._id);
    setTodoListData([
      ...todoListData.filter(todo => todo._id !== item._id),
      item,
    ]);
  };

  if (!token) {
    return null;
  }

  return (
    <FlatList
      data={todoListData}
      keyExtractor={item => item._id.toString()}
      renderItem={({ item }) => (
        <View style={{ ...styles.taskItem, ...border }}>
          <Checkbox handlePress={handleCheckboxPress} item={item} />
          <View style={{ ...styles.textContainer, ...text }}>
            {editingItemId === item._id ? (
              <TextInput
                style={text}
                value={editingItemText}
                onChangeText={text => setEditingItemText(text)}
                onBlur={() => handleEditSave(item._id)}
                autoFocus
              />
            ) : (
              <CustomTouchButton
                onPress={() => handleEditStart(item._id, item.title)}
                title={item.title}
                style2={text}
              />
            )}
          </View>
          <CustomIconButton
            onPress={() => handleEditStart(item._id, item.title)}
            iconSource={require('../assets/pen.png')}
            style={styles.icon}
          />
          <CustomIconButton
            onPress={() => handleDeleteTask(item._id, item.title)}
            iconSource={require('../assets/bin1.png')}
          />
        </View>
      )}
    />
  );
};

export default FlatListRender;

const styles = StyleSheet.create({
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#BF1769',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    padding: 10,
    fontSize: 18,
    flex: 1,
  },
  delete: {
    color: 'grey',
    fontSize: 13,
  },
  icon: {
    marginRight: 10,
  },
});
