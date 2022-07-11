import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/themeContext';

export default function HomeScreen() {
  const { changeTheme, theme } = useTheme();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={changeTheme}>
        <Text>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
