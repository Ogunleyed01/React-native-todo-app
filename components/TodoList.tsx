import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { TodoItem } from './TodoItem';

type Filter = 'All' | 'Active' | 'Completed';

interface TodoListProps {
  filter: Filter;
  list: { title: string; completed: boolean; }[];
  deleteItem: (title: string) => void;
  completeItem: (title: string) => void;
  onReorder?: (reorderedList: { title: string; completed: boolean; }[]) => void;
}

export function TodoList({ filter, list, deleteItem, completeItem, onReorder }: TodoListProps) {
  const { isDark } = useTheme();
  
  // Direct API access - anyApi should work with property access
  // const queryFn = (api as any).todos.getAll;
  // const todos = useQuery(queryFn);
  // const updateOrder = useMutation((api as any).todos.reorder);
  
  // React.useEffect(() => {
  //   console.log('=== TODO LIST QUERY UPDATE ===');
  //   console.log('Query function:', queryFn);
  //   console.log('Query function defined?', !!queryFn);
  //   console.log('Query function type:', typeof queryFn);
  //   console.log('API todos exists:', !!(api as any).todos);
  //   console.log('API todos.getAll exists:', !!(api as any).todos?.getAll);
  //   console.log('Query result:', todos);
  //   console.log('Is undefined?', todos === undefined);
  //   console.log('Is null?', todos === null);
  //   console.log('Is array?', Array.isArray(todos));
  //   if (todos) {
  //     console.log(' Todos loaded!');
  //     console.log('Number of todos:', todos.length);
  //     if (todos.length > 0) {
  //       console.log('First todo:', JSON.stringify(todos[0], null, 2));
  //     }
  //     console.log('All todos:', JSON.stringify(todos, null, 2));
  //   } else if (todos === undefined) {
  //     console.log('⏳ Query is loading... (this is normal on first render)');
  //   } else {
  //     console.log('⚠️ Query returned null');
  //   }
  //   console.log('=== QUERY UPDATE END ===');
  // }, [todos, queryFn]);
  
  const bgColor = isDark ? '#25273D' : '#FFFFFF';
  const textColor = isDark ? '#5B5E7E' : '#9495A5';

  // const handleDragEnd = async ({ data }: { data: typeof filteredTodos }) => {
  //   if (!data) return;
  //   // Update the order for each item
  //   for (let i = 0; i < data.length; i++) {
  //     await updateOrder({ id: data[i]._id, newOrder: i });
  //   }
  // };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<{ title: string; completed: boolean }>) => {
    return (
      <TodoItem
        completeItem={completeItem}
        deleteItem={deleteItem}
        id={item.title}
        title={item.title}
        completed={item.completed}
        drag={drag}
        isActive={isActive}
      />
    );
  };

  const handleDragEnd = ({ data }: { data: { title: string; completed: boolean; }[] }) => {
    if (onReorder) {
      // If filtering, we need to map the reordered filtered items back to the full list
      if (filter === 'All') {
        onReorder(data);
      } else {
        // For filtered views, we preserve the order of items in the filtered view
        // and update the positions in the full list accordingly
        const filteredSet = new Set(data.map(item => item.title));
        const otherItems = list.filter(item => !filteredSet.has(item.title));
        
        // Combine: filtered items in new order, then other items
        if (filter === 'Active') {
          onReorder([...data, ...otherItems.filter(item => item.completed)]);
        } else {
          onReorder([...otherItems.filter(item => !item.completed), ...data]);
        }
      }
    }
  };

  const filteredList = React.useMemo(() => {
    if (filter === 'All') return list;
    if (filter === 'Active') return list.filter(todo => !todo.completed);
    return list.filter(todo => todo.completed);
  }, [list, filter]);

  if (filteredList.length === 0) {
    return (
      <View
        style={{
          marginHorizontal: 24,
          marginTop: 16,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          overflow: 'hidden',
          backgroundColor: bgColor,
          paddingVertical: 32,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        <Text style={{ textAlign: 'center', color: textColor }}>
          {list.length === 0 
            ? 'No todos yet. Add one above!'
            : `No ${filter.toLowerCase()} todos.`}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        marginHorizontal: 24,
        marginTop: 16,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        overflow: 'hidden',
        backgroundColor: bgColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <DraggableFlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item: { title: string; completed: boolean }) => item.title}
        onDragEnd={handleDragEnd}
        scrollEnabled={false}
      />
    </View>
  );
}

