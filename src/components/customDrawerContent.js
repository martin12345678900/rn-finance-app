import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Switch,
  Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { useTheme as useMyTheme } from '../context/themeContext';

import { avatar } from '../constants/images';
const MenuItems = ['Home', 'Profile', 'Settings'];

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';

const height = Dimensions.get('screen').height;

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
                        fontSize: focused ? 20 : 18,
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
              icon={faPowerOff}
              size={24}
              style={{ marginRight: 8, color: theme.colors.text2 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
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

export default CustomDrawerContent;
