import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export function TodoInput({ onSubmitEditing }: { onSubmitEditing: (text: string) => void }) {
  const { isDark } = useTheme();
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    if (text.trim()) {
      const todoText = text.trim();
      onSubmitEditing(todoText);
      setText(''); // Clear input field after adding todo
      // try {
      //   console.log('=== CREATE TODO START ===');
      //   console.log('Todo text:', todoText);
      //   console.log('Mutation function exists:', !!createTodo);
      //   console.log('Mutation function type:', typeof createTodo);
      //   console.log('API todos exists:', !!(api as any).todos);
      //   console.log('API todos.create exists:', !!(api as any).todos?.create);
        
      //   // Add timeout to detect hanging mutations
      //   const timeoutPromise = new Promise((_, reject) => {
      //     setTimeout(() => reject(new Error('Mutation timeout after 10 seconds')), 10000);
      //   });
        
      //   console.log('About to call mutation with:', { title: todoText });
      //   const mutationPromise = createTodo({ title: todoText });
      //   console.log('Mutation promise created:', mutationPromise);
      //   console.log('Mutation promise type:', typeof mutationPromise);
      //   console.log('Mutation promise is Promise?', mutationPromise instanceof Promise);
        
      //   console.log('Awaiting mutation...');
      //   console.log('Waiting for server response...');
      //   const result = await Promise.race([mutationPromise, timeoutPromise]);
      //   console.log('✅ Promise resolved successfully!');
      //   console.log('Received result from server');
        
      //   console.log('✅ Mutation SUCCEEDED!');
      //   console.log('Mutation result:', result);
      //   console.log('Result type:', typeof result);
      //   console.log('Result stringified:', JSON.stringify(result));
      //   console.log('=== CREATE TODO END ===');
      //   setText('');
      // } catch (error: any) {
      //   console.error('❌ Mutation FAILED!');
      //   console.error('Error:', error);
      //   console.error('Error name:', error?.name);
      //   console.error('Error message:', error?.message);
      //   console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      //   if (error?.stack) {
      //     console.error('Error stack:', error.stack);
      //   }
      //   console.error('=== CREATE TODO ERROR END ===');
      // }
    }
  };

  const bgColor = isDark ? '#25273D' : '#FFFFFF';
  const textColor = isDark ? '#C8CBE7' : '#494C6B';
  const borderColor = isDark ? '#393A4B' : '#E3E4F1';

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { backgroundColor: bgColor }]}>
        <View style={[styles.checkbox, { borderColor: borderColor }]} />
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder="Create a new todo..."
          placeholderTextColor="#9495A5"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          accessibilityLabel="Todo input"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: -100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});

