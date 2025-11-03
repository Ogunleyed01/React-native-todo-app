import { TodoFooter } from '@/components/TodoFooter';
import { TodoHeader } from '@/components/TodoHeader';
import { TodoInput } from '@/components/TodoInput';
import { TodoList } from '@/components/TodoList';
import { useTheme } from '@/contexts/ThemeContext';
import { loadTodos, saveTodos, type Todo } from '@/utils/storage';
import React, { useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Filter = 'All' | 'Active' | 'Completed';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const [filter, setFilter] = React.useState<Filter>('All');
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const bgColor = isDark ? '#171823' : '#FAFAFA';

  // Load todos on mount
  useEffect(() => {
    const initializeTodos = async () => {
      try {
        const savedTodos = await loadTodos();
        setTodoList(savedTodos);
      } catch (error) {
        console.error('Error loading todos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeTodos();
  }, []);

  // Save todos whenever the list changes
  useEffect(() => {
    if (!isLoading) {
      saveTodos(todoList);
    }
  }, [todoList, isLoading]);

  const deleteItem = useCallback((title: string) => {
    setTodoList(prevList => prevList.filter(item => item.title !== title));
  }, []);

  const completeItem = useCallback((title: string) => {
    setTodoList(prevList => prevList.map(item => {
      if (item.title === title) {
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodoList(prevList => prevList.filter(item => !item.completed));
  }, []);

  const reorderTodos = useCallback((reorderedList: Todo[]) => {
    setTodoList(reorderedList);
  }, []);

  const addTodo = useCallback((text: string) => {
    setTodoList(prevList => [...prevList, { title: text, completed: false }]);
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TodoHeader />
          <TodoInput onSubmitEditing={addTodo} />
          <TodoList filter={filter} list={todoList} deleteItem={deleteItem} completeItem={completeItem} onReorder={reorderTodos} />
          <TodoFooter currentFilter={filter} onFilterChange={setFilter} todoList={todoList} onClearCompleted={clearCompleted} />
          
          {/* Drag and drop instruction - on parent background */}
          {todoList.length > 0 && (
            <View style={{ marginHorizontal: 24, marginTop: 16, marginBottom: 20 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: isDark ? '#5B5E7E' : '#9495A5',
                }}
              >
                Drag and drop to reorder list
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
