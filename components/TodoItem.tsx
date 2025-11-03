import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  deleteItem: (title: string) => void;
  completeItem: (title: string) => void;
  drag?: () => void;
  isActive?: boolean;
}

export function TodoItem({ id, title, completed, deleteItem, completeItem, drag, isActive }: TodoItemProps) {
  const { isDark } = useTheme();
  const handleDelete = () => {
    deleteItem(title);
  };

  const bgColor = isDark ? '#25273D' : '#FFFFFF';
  const textColor = isDark ? '#C8CBE7' : '#494C6B';
  const completedTextColor = isDark ? '#4D5067' : '#D1D2DA';
  const borderColor = isDark ? '#393A4B' : '#E3E4F1';

  return (
    <View
      style={{
        paddingHorizontal: 20,
        backgroundColor: bgColor,
        borderBottomWidth: 1,
        borderBottomColor: borderColor,
        opacity: isActive ? 0.8 : 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          console.log('Todo item pressed');
          completeItem(title);
        }}
        onLongPress={drag}
        delayLongPress={drag ? 200 : undefined}
        disabled={isActive}
        style={styles.container}
        accessibilityLabel={completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {completed ? (
            <LinearGradient
              colors={['#55DDFF', '#C058F3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Feather name="check" size={16} color="white" />
            </LinearGradient>
          ) : (
            <TouchableOpacity
              onPress={() => {
                console.log('Checkbox pressed');
                completeItem(title)
              }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: borderColor,
                marginRight: 12,
              }}
            />
          )}
          <Text
            style={{
              fontSize: 18,
              color: completed ? completedTextColor : textColor,
              textDecorationLine: completed ? 'line-through' : 'none',
              flex: 1,
            }}
          >
            {title}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleDelete}
          accessibilityLabel="Delete todo"
        >
          <Feather
            name="x"
            size={20}
            color={isDark ? '#5B5E7E' : '#494C6B'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
});

