import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import _ from 'lodash';
import i18n from '../text/i18n';

type ItemType = {
  id: number;
  title: string;
  done: boolean;
};

type AppContextType = {
  todoListData: ItemType[];
  setTodoListData: Dispatch<SetStateAction<ItemType[]>>;
  number: any;
  setNumber: Dispatch<SetStateAction<any>>;
  addTodos: (num: number) => void;
  deleteItem: (id: number) => void;
  addTask: (title: string) => void;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextType>({
  todoListData: [],
  setTodoListData: () => {},
  number: null,
  setNumber: () => {},
  addTodos: () => {},
  deleteItem: () => {},
  addTask: () => {},
});

// Create the provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [todoListData, setTodoListData] = useState<ItemType[]>([]);
  const [number, setNumber] = useState(0);

  // Function that creates a new todo list according to the user's input
  const addTodos = (num: number) => {
    const newData = [];
    for (let i = 0; i < num; i++) {
      const obj = {
        id: i + 1,
        title: i18n.t('main.task') + `${i + 1}`,
        done: false,
      };
      newData.push(obj);
    }
    setTodoListData(newData);
  };

  // Function to add a new task to the todo list
  const addTask = (title: string) => {
    const newTask = {
      id: todoListData.length + 1,
      title: title,
      done: false,
    };
    setTodoListData([...todoListData, newTask]);
  };

  const deleteItem = (id: number) => {
    const newTodoListData = _.reject(todoListData, { id: id });
    setTodoListData(newTodoListData);
  };

  return (
    <AppContext.Provider
      value={{
        todoListData,
        setTodoListData,
        number,
        setNumber,
        addTodos,
        deleteItem,
        addTask,
      }}>
      {children}
    </AppContext.Provider>
  );
};
