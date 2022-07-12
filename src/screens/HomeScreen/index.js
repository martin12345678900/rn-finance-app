import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme as useMyTheme } from '../../context/themeContext';

import { SliderBox } from 'react-native-image-slider-box';
import { useTheme } from '@react-navigation/native';

export default function HomeScreen() {
  const { changeTheme, theme: myTheme } = useMyTheme();
  const theme = useTheme();
  const [images, setImages] = useState([
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ]);

  return (
    <SafeAreaView>
      {/* <SliderBox
        images={images}
        sliderBoxHeight={200}
        onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
        dotColor={theme.colors.notification}
        inactiveDotColor={theme.colors.grey}
        autoplay
        circleLoop
      /> */}
      <Text>Martin</Text>
    </SafeAreaView>
  );
}
