import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

type Filter = 'All' | 'Active' | 'Completed';

interface TodoFooterProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  todoList: { title: string; completed: boolean }[];
  onClearCompleted?: () => void;
}

export function TodoFooter({ currentFilter, onFilterChange, todoList, onClearCompleted }: TodoFooterProps) {
  const { isDark } = useTheme();

  const activeTodos = todoList.filter(todo => !todo.completed);
  const completedTodos = todoList.filter(todo => todo.completed);

  const handleClearCompleted = async () => {
    if (onClearCompleted) {
      onClearCompleted();
    }
  };

  const bgColor = isDark ? '#25273D' : '#FFFFFF';
  const textColor = isDark ? '#5B5E7E' : '#9495A5';
  const borderColor = isDark ? '#393A4B' : '#E3E4F1';
  const activeFilterColor = '#3A7CFD';

  // Don't show footer if no todos
  if (todoList.length === 0) {
    return null;
  }

  return (
    <>
      {/* Stats and Clear - Connected to todo list */}
      <View style={{ marginHorizontal: 24, marginTop: 0 }}>
        <View
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            overflow: 'hidden',
            backgroundColor: bgColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
          >
            <Text style={{ fontSize: 14, color: textColor }}>
              {activeTodos.length} items left
            </Text>
            <TouchableOpacity onPress={handleClearCompleted}>
              <Text style={{ fontSize: 14, color: textColor }}>
                Clear Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Filter Buttons - Separate with gap */}
      <View style={{ marginHorizontal: 24, marginTop: 16 }}>
        <View
          style={{
            borderRadius: 5,
            overflow: 'hidden',
            backgroundColor: bgColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: 16 }}>
            {(['All', 'Active', 'Completed'] as Filter[]).map((filterOption) => (
              <TouchableOpacity
                key={filterOption}
                onPress={() => onFilterChange(filterOption)}
                style={{ paddingHorizontal: 16 }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: currentFilter === filterOption ? activeFilterColor : textColor,
                    fontWeight: currentFilter === filterOption ? '700' : '400',
                  }}
                >
                  {filterOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </>
  );
}

export { type Filter };

