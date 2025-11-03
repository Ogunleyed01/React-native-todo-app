import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function TodoHeader() {
  const { toggleTheme, isDark } = useTheme();
  
  const backgroundImage = isDark 
    ? require('../assets/darkBitmap (1).jpg')
    : require('../assets/lightBitmap.jpg');

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          TODO
        </Text>
        <TouchableOpacity onPress={toggleTheme} accessibilityLabel="Toggle theme">
          <Feather
            name={isDark ? 'sun' : 'moon'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    height: 200,
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 0,
    width: 375,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 15,
  },
});

