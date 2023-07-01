import React, { useContext, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  StatusBar,
  Modal,
  TouchableOpacity,
} from 'react-native';
import FlatListData from '../components/FlatListData';
import LINK from '../config';
import { AppContext } from '../components/appContext';
import i18n from '../text/i18n';
import LanguageMenu from '../components/LanguageMenu';
import SwitchTheme from '../components/SwitchTheme';
import { useThemeMode } from '../components/themeContext';
import { themes } from '../palette/themes';
const screenDimensions = Dimensions.get('window');

const Main = () => {
  const { addTask } = useContext(AppContext);
  const { mode, isDarkMode } = useThemeMode();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const opposideMode = isDarkMode ? 'light' : 'dark';
  const backgroundModal = {
    backgroundColor: themes[opposideMode].background.primary,
  };

  const background = {
    backgroundColor: themes[mode || 'light'].background.primary,
  };
  const borderBottom = {
    borderBottomColor: themes[mode || 'light'].border.primary,
  };
  const text = { color: themes[mode || 'light']?.text.primary };
  const textModal = { color: themes[opposideMode].button.primary };

  //const handleSubmit = () => {
  //  if (isNaN(number) || number === 0) {
  //    Alert.alert(i18n.t('main.alert1'), i18n.t('main.alert2'));
  //  } else {
  //    Alert.alert(
  //      i18n.t('main.alert3', { number: number }),
  //      i18n.t('main.alert5'),
  //    );
  //    addTodos(number);
  //  }
  //};

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      Alert.alert(i18n.t('main.error1'), i18n.t('main.error2'));
      return;
    }
    addTask(taskTitle);
    setModalVisible(false);
    setTaskTitle('');
  };

  return (
    <View style={{ ...styles.container, ...background }}>
      <View style={{ ...styles.header, ...borderBottom }}>
        <StatusBar />
        <Image
          source={{
            uri: LINK,
          }}
          style={styles.headerImage}
          onError={err => console.log(err)}
        />
        <View style={styles.languageMenuContainer}>
          <LanguageMenu />
          <SwitchTheme />
        </View>
        {/*<Text style={{ ...styles.headerText, ...borderBottom, ...text }}>
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
        />*/}
        <TouchableOpacity
          style={{ ...styles.headerText, ...borderBottom, ...text }}
          onPress={() => setModalVisible(true)}>
          <Text style={{ ...styles.input, ...backgroundModal, ...textModal }}>
            {' '}
            +{i18n.t('main.add')}{' '}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatListData />
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View
            style={{
              ...styles.modalContent,
              ...backgroundModal,
            }}>
            <TextInput
              style={{ ...styles.modalInput, ...textModal }}
              value={taskTitle}
              placeholder={i18n.t('main.placeholder2')}
              onChangeText={setTaskTitle}
            />
            <TouchableOpacity onPress={handleAddTask}>
              <Text style={textModal}>{i18n.t('main.add')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={textModal}>{i18n.t('main.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 30,
    width: 250,
    margin: 6,
    padding: 2,
    textAlign: 'center',
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 3,
  },
  headerImage: {
    width: screenDimensions.width,
    height: (screenDimensions.height / 5) * 1.618,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: screenDimensions.width * 0.8,
    height: (screenDimensions.height / 9) * 1.618,
    borderRadius: 4,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInput: {
    width: '100%',
    height: screenDimensions.height / 17,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
