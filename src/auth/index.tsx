import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const TOKEN_STORAGE_KEY = '@todo:token';

export const signin = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, {
      email,
      password,
    });
    const token = response.data.token;
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signup = async (
  email: string,
  password: string,
): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      email,
      password,
    });
    const token = response.data.token;
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
