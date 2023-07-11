import axios from 'axios';
import {
  API_BASE_URL,
  TOKEN_STORAGE_KEY,
  USERID_STORAGE_KEY,
} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to add a task
export const addTaskApi = async (userId: string, title: string) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      userId,
      title,
    };

    const response = await axios.post(`${API_BASE_URL}/addtask`, data, config);
    console.log('response data from API INDEX', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add task');
  }
};

// Function to delete a task
export const deleteTaskApi = async (taskId: string) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.delete(
      `${API_BASE_URL}/tasks/${taskId}`,
      config,
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete task');
  }
};

export const fetchTasksApi = async (token: string, userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${userId} `, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    return error;
  }
};

// Update the task's done value
export const toggleDoneApi = async (taskId: string, done: boolean) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      done,
    };

    const response = await axios.patch(
      `${API_BASE_URL}/tasks/${taskId}`,
      data,
      config,
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to toggle task done value');
  }
};

// Update the task's title
export const editTitleApi = async (taskId: string, title: string) => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      title,
    };

    const response = await axios.put(
      `${API_BASE_URL}/tasks/${taskId}`,
      data,
      config,
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to edit task title');
  }
};
