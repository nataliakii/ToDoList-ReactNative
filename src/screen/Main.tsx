import React, { useContext, useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  StatusBar,
  Modal,
  ViewStyle,
  TextStyle,
} from 'react-native';
import FlatListData from '../components/FlatListData';
import { LINK } from '../../config';
//import { TOKEN_STORAGE_KEY } from '../../config';
import { AppContext } from '../context/appContext';
import i18n from '../translations/i18n';
import { useThemeMode } from '../context/themeContext';
import { themes } from '../palette/themes';
import CustomTouchButton from '../components/CustomTouchButton';
import ThreeButtons from '../components/ThreeButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';

type MainProps = {
  navigation: NavigationProp<any>;
};

const screenDimensions = Dimensions.get('window');

const Main: React.FC<MainProps> = ({ navigation }) => {
  const { addTask, token, setToken } = useContext(AppContext);
  const { mode, isDarkMode } = useThemeMode();
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const { buttonStyle } = themes;

  const opposideMode = isDarkMode ? 'light' : 'dark';
  const backgroundModal: ViewStyle = {
    backgroundColor: themes[opposideMode].background.primary,
  };
  const buttonContainerStyle: ViewStyle = {
    ...buttonStyle,
    backgroundColor: themes[mode || 'light'].button.primary,
  };

  const background: ViewStyle = {
    backgroundColor: themes[mode || 'light'].background.primary,
  };
  const borderBottom: ViewStyle = {
    borderBottomColor: themes[mode || 'light'].border.primary,
  };
  const text: TextStyle = {
    color: themes[mode || 'light']?.text.primary,
    fontSize: themes.textSize.medium,
  };
  const textModal: TextStyle = {
    color: themes[opposideMode].text.primary,
    fontSize: themes.textSize.medium,
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      navigation.navigate('Main');
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  const handleAddTask = () => {
    if (taskTitle.trim() === '') {
      Alert.alert(i18n.t('main.error1'), i18n.t('main.error2'));
      return;
    }
    addTask(taskTitle);
    setModalVisible(false);
    setTaskTitle('');
  };

  const goToSettings = () => {
    navigation.navigate('Settings');
  };
  const goToSignin = () => {
    navigation.navigate('SignIn');
  };
  const goToSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={{ ...styles.container, ...background }}>
      <View style={{ ...styles.header, ...borderBottom }}>
        <StatusBar />
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: LINK,
            }}
            style={styles.headerImage}
            onError={err => console.log(err)}
          />
          <ThreeButtons
            goToSettings={goToSettings}
            goToSignin={goToSignin}
            goToSignup={goToSignup}
            handleLogout={handleLogout}
            buttonContainerStyle={buttonContainerStyle}
            textModal={textModal}
            i18n={i18n}
          />
        </View>

        <CustomTouchButton
          style1={{ ...styles.headerText, ...borderBottom, ...text }}
          onPress={() => setModalVisible(true)}
          style2={{ ...styles.input, ...backgroundModal, ...textModal }}
          title={i18n.t('main.add')}
        />
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
            <CustomTouchButton
              onPress={handleAddTask}
              style2={textModal}
              title={i18n.t('main.add')}
            />
            <CustomTouchButton
              onPress={() => setModalVisible(false)}
              style2={textModal}
              title={i18n.t('main.cancel')}
            />
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
  header: {
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 3,
  },
  input: {
    height: 50,
    width: screenDimensions.width,
    margin: 3,
    padding: 8,
    textAlign: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    top: 50,
    transform: [{ translateY: -50 }],
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerImage: {
    width: screenDimensions.width,
    height: (screenDimensions.height / 5) * 1.618,
  },
  headerText: {
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: screenDimensions.width * 0.8,
    height: (screenDimensions.height / 7) * 1.618,
    borderRadius: 4,
    padding: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInput: {
    width: '100%',
    height: screenDimensions.height / 17,
    borderWidth: 1,
    borderRadius: 4,
    margin: 10,
    padding: 5,
  },
});
