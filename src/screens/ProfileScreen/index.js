import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';

import { SafeAreaView } from 'react-native-safe-area-context';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';
import { types } from '../../constants';
import { ScrollView } from 'react-native';

export default function ProfileScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState([]);

  useEffect(() => {
    async function requestPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED)
          setCameraPermissionGranted(true);
        else setCameraPermissionGranted(false);
      } catch (err) {
        console.log('err', err?.message);
      }
    }

    requestPermission();
  }, []);

  console.log(cameraPermissionGranted);
  console.log('image', image);

  async function handlePhoto(type) {
    console.log('here');
    if (type !== types.default.TAKE_PHOTO && type !== types.default.PICK_PHOTO)
      return;
    if (!cameraPermissionGranted) return;

    const options = { mediaType: 'image', quality: 0.8 };

    const { assets } =
      type === types.default.TAKE_PHOTO
        ? await launchCamera(options)
        : await launchImageLibrary(options);

    const imageUri = assets[0].uri;
    setImage(imageUri);

    const textRecognitionResult = await MlkitOcr.detectFromUri(imageUri);
    console.log(textRecognitionResult);
    setRecognizedText(textRecognitionResult.map(result => result.text));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          REACT NATIVE OCR(Optical Charackter Recognition)
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePhoto(types.default.TAKE_PHOTO)}>
          <Text style={styles.buttonText}>Take a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePhoto(types.default.PICK_PHOTO)}>
          <Text style={styles.buttonText}>Pick a photo from gallery</Text>
        </TouchableOpacity>
      </View>
      <View>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      <ScrollView>
        <Text>{JSON.stringify(recognizedText)}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.text1,
      textAlign: 'center',
    },
    titleContainer: { padding: 40 },
    buttonsContainer: { width: '80%' },
    button: {
      paddingVertical: 10,
      backgroundColor: theme.colors.text2,
      margin: 10,
      borderRadius: 10,
      width: '100%',
    },
    buttonText: {
      textAlign: 'center',
      color: theme.colors.white,
      fontSize: 16,
    },
    image: {
      width: 350,
      height: 300,
      margin: 30,
    },
  });
