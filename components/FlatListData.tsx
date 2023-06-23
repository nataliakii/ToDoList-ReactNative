import React, { useContext, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Checkbox from './Checkbox';
import { AppContext } from './appContext';
import i18n from '../text/i18n';

const FlatListRender: React.FC = () => {
  const { todoListData, setTodoListData, deleteItem } = useContext(AppContext);

  const [editingItemId, setEditingItemId] = useState(0);
  const [editingItemText, setEditingItemText] = useState('');

  const handleDelete = (id: number, title: string) => {
    Alert.alert(
      i18n.t('flat-list.alert1'),
      i18n.t('flat-list.alert2', { title: title }),
      [
        {
          text: i18n.t('flat-list.alert3'),
          style: 'cancel',
        },
        { text: i18n.t('flat-list.alert4'), onPress: () => deleteItem(id) },
      ],
    );
  };

  const handleEditStart = (itemId: number, currentText: string) => {
    setEditingItemId(itemId);
    setEditingItemText(currentText);
  };

  const handleEditSave = (itemId: number) => {
    const updatedData = todoListData.map(item => {
      if (item.id === itemId) {
        return { ...item, title: editingItemText };
      }
      return item;
    });
    setTodoListData(updatedData);
    // Reset the editing state
    setEditingItemId(0);
    setEditingItemText('');
  };

  const handleCheckboxPress = (
    item: { id: number; done: boolean; title: String },
    isChecked: boolean,
  ) => {
    item.done = isChecked;
    // sorting updated data so done items go to the end of the list
    setTodoListData(
      [...todoListData].sort((a, b) =>
        a.done === b.done ? 0 : a.done ? 1 : -1,
      ),
    );
  };

  return (
    <FlatList
      data={todoListData}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Checkbox handlePress={handleCheckboxPress} item={item} />
          <View style={styles.textContainer}>
            {editingItemId === item.id ? (
              <TextInput
                value={editingItemText}
                onChangeText={text => setEditingItemText(text)}
                onBlur={() => handleEditSave(item.id)}
                autoFocus
              />
            ) : (
              <TouchableOpacity
                onPress={() => handleEditStart(item.id, item.title)}>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Delete button */}
          <TouchableOpacity onPress={() => handleDelete(item.id, item.title)}>
            <Text style={styles.delete}>{i18n.t('flat-list.del')}</Text>
          </TouchableOpacity>
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
});
