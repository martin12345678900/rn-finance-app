import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Switch,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { useTheme } from '@react-navigation/native';
import { useTheme as useMyTheme } from '../context/themeContext';

import { avatar } from '../constants/images';

const Drawer = createDrawerNavigator();

const MenuItems = ['Home', 'Profile', 'Settings'];

const height = Dimensions.get('screen').height;

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';

import { SafeAreaView } from 'react-native-safe-area-context';

const CustomDrawerContent = ({ navigation, theme }) => {
  const [active, setActive] = useState(0);

  const { theme: myTheme, changeTheme } = useMyTheme();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          width: 210,
          height: 110,
          borderBottomEndRadius: 107 / 2,
          backgroundColor: theme.colors.background,
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 10,
        }}>
        <View>
          <View>
            <Image source={avatar} style={{ width: 40, height: 40 }} />
          </View>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.text1,
                fontWeight: 'bold',
              }}>
              Martin Kolev
            </Text>
            <Text style={{ fontSize: 12, color: theme.colors.text2 }}>
              Varna, Bulgaria
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <DrawerContentScrollView
        scrollEnabled={false}
        contentContainerStyle={{}}
        style={{}}>
        {MenuItems.map((m, index) => (
          <DrawerItem
            activeTintColor={theme.colors.boxBackground}
            focused={active === index}
            key={index}
            label={({ focused }) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate(m);
                    setActive(index);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: focused ? 'bold' : '400',
                        color: theme.colors.text2,
                      }}>
                      {m}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        ))}
      </DrawerContentScrollView>
      <View
        style={{
          marginBottom: height * 0.1,
          marginLeft: height * 0.025,
        }}>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={24}
              style={{ marginRight: 8, color: theme.colors.text2 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '900',
                color: theme.colors.text2,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Switch
            trackColor={{
              false: theme.colors.white,
              true: theme.colors.black,
            }}
            thumbColor={
              myTheme === 'light' ? theme.colors.white : theme.colors.black
            }
            onValueChange={changeTheme}
            value={myTheme === 'light'}
          />
          <Text
            style={{
              marginLeft: 8,
              fontSize: 16,
              fontWeight: '500',
              color: theme.colors.text2,
            }}>
            Change Theme
          </Text>
        </View>
      </View>
    </View>
  );
};

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
        drawerContent={({ navigation }) => {
          return <CustomDrawerContent navigation={navigation} theme={theme} />;
        }}>
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
