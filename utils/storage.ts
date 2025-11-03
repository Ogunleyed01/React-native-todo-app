import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_STORAGE_KEY = '@todoapp:todos';

export type Todo = {
  title: string;
  completed: boolean;
};

// Load todos from storage
export const loadTodos = async (): Promise<Todo[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
    if (jsonValue != null) {
      const todos = JSON.parse(jsonValue);
      return Array.isArray(todos) ? todos : [];
    }
    return [];
  } catch (error) {
    console.error('Error loading todos:', error);
    return [];
  }
};

// Save todos to storage
export const saveTodos = async (todos: Todo[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem(TODOS_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving todos:', error);
  }
};

// Clear all todos from storage
export const clearTodos = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TODOS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing todos:', error);
  }
};

