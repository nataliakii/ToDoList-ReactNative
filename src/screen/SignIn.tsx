import React, { useState, useContext } from 'react';
import { AppContext } from '../context/appContext';
import { useThemeMode } from '../context/themeContext';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  Text,
  TextStyle,
} from 'react-native';
import i18n from '../translations/i18n';
import { TOKEN_STORAGE_KEY } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signin } from '../auth';
import { NavigationProp } from '@react-navigation/native';
import { themes } from '../palette/themes';
import CustomTouchButton from '../components/CustomTouchButton';

type SignInProps = {
  navigation: NavigationProp<any>;
};

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setToken } = useContext(AppContext);
  const { mode } = useThemeMode();
  const background: ViewStyle = {
    backgroundColor: themes[mode || 'light'].background.primary,
  };
  const text = {
    color: themes[mode || 'light'].text.secondary,
    fontSize: themes.textSize.medium,
  };
  const { buttonStyle } = themes;
  const buttonContainerStyle: ViewStyle = {
    ...buttonStyle,
    backgroundColor: themes[mode || 'light'].button.primary,
  };
  const textModal: TextStyle = {
    color: themes[mode || 'light'].text.primary,
    fontSize: themes.textSize.medium,
  };

  const handleLogin = async () => {
    try
    {
      console.log("------",email,password)
      await signin(email, password);
      setToken(await AsyncStorage.getItem(TOKEN_STORAGE_KEY));
      navigation.navigate('Main');
    } catch (error) {
      console.log('Error signing in:', error?.response?.data);
      setError(error?.response?.data?.errors[0].msg);
    }
  };

  return (
    <View style={{ ...styles.container, ...background }}>
      <Text style={{ ...styles.text, ...textModal }}>
        {i18n.t('signin.signinPage')}
      </Text>
      <View style={styles.centeredContent}>
        <TextInput
          style={{ ...styles.input, ...textModal }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{ ...styles.input, ...textModal }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <CustomTouchButton
          onPress={handleLogin}
          title={i18n.t('signin.signinPage')}
          style1={{ ...buttonContainerStyle, ...styles.padding }}
          style2={text}
        />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    marginBottom: 20,
  },
  centeredContent: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: 20,
  },
  input: {
    height: 50,
    width: 300,
    margin: 7,
    padding: 8,
    textAlign: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
