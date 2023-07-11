import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from 'react';
import _ from 'lodash';
//import i18n from '../translations/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE_KEY, USERID_STORAGE_KEY } from '../../config';
import {
  addTaskApi,
  deleteTaskApi,
  fetchTasksApi,
  toggleDoneApi,
  editTitleApi,
} from '../api';

type ItemType = {
  _id: number;
  title: string;
  done: boolean;
};

type AppContextType = {
  todoListData: ItemType[];
  setTodoListData: Dispatch<SetStateAction<ItemType[]>>;
  deleteTask: (_id: string) => void;
  addTask: (title: string) => void;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
  toggleDone: (done: boolean, taskId: string) => void;
  editTitle: (title: string, taskId: string) => void;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextType>({
  todoListData: [],
  setTodoListData: () => {},
  deleteTask: () => {},
  addTask: () => {},
  token: null,
  setToken: () => {},
  userId: null,
  setUserId: () => {},
  toggleDone: () => {},
  editTitle: () => {},
});

// Create the provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [todoListData, setTodoListData] = useState<ItemType[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  //check if there is auth
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
        const userId = await AsyncStorage.getItem(USERID_STORAGE_KEY);
        setToken(storedToken);
        setUserId(userId);
      } catch (error) {
        console.log('Error retrieving token:', error);
      }
    };
    loadToken();
  }, []);
  //upload todolist from DB if user is signed in or AsyncStorage - if not
  useEffect(() => {
    // Fetch initial data when the token is available
    const fetchInitialData = async () => {
      try {
        const response = await fetchTasksApi(token, userId);
        setTodoListData(response.data.tasks);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    if (token && userId) {
      fetchInitialData();
    }
  }, [token, userId]);
  //save todolist to todoListData
  //useEffect(() => {
  //  // Save the updated todoListData to AsyncStorage whenever it changes
  //  const saveTodoListData = async () => {
  //    try {
  //      const stringifiedData = JSON.stringify(todoListData);
  //      await AsyncStorage.setItem('todoListData', stringifiedData);
  //    } catch (error) {
  //      console.log('Error saving todoListData to AsyncStorage:', error);
  //    }
  //  };
  //  if (token === null) {
  //    saveTodoListData();
  //  }
  //}, [todoListData]);

  const addTask = async (title: string) => {
    try {
      console.log('addTaks from AppContext hit. userId is ', userId);
      const response = await addTaskApi(userId, title);
      console.log('Response data from AppContext', response);
      setTodoListData(response.tasks);
      console.log('newly set TODOLIST -------', todoListData);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const toggleDone = async (done: boolean, taskId: string) => {
    try {
      const response = await toggleDoneApi(taskId, done);
      console.log(
        'toggleDode is made successfullt, this task was updated',
        response,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    //const newTodoListData = _.reject(todoListData, { id: id });
    //setTodoListData( newTodoListData );
    try {
      const response = await deleteTaskApi(taskId);
      console.log('task was deleted updated list of tasks is', response);
      setTodoListData(response.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const editTitle = async (title: string, taskId: string) => {
    try {
      const response = await editTitleApi(taskId, title);
      console.log('task was edited updated list of tasks is', response);
      setTodoListData(prevData =>
        prevData.map(task =>
          task._id === taskId ? { ...task, title: response.title } : task,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        todoListData,
        setTodoListData,
        deleteTask,
        addTask,
        token,
        setToken,
        setUserId,
        userId,
        toggleDone,
        editTitle,
      }}>
      {children}
    </AppContext.Provider>
  );
};
