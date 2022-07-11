import React from 'react';
import { View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { useTheme } from '@react-navigation/native';
import CustomDrawerContent from '../components/customDrawerContent';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.boxBackground,
      }}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            flex: 1,
            width: '60%',
            backgroundColor: 'transparent',
          },
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        drawerContent={({ navigation }) => (
          <CustomDrawerContent navigation={navigation} theme={theme} />
        )}>
        <Drawer.Screen
          name="Home"
          children={props => <HomeScreen {...props} />}
        />
        <Drawer.Screen
          name="Profile"
          children={props => <ProfileScreen {...props} />}
        />
        <Drawer.Screen
          name="Settings"
          children={props => <SettingsScreen {...props} />}
        />
      </Drawer.Navigator>
    </View>
  );
}
