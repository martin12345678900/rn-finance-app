import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  NativeEventEmitter,
  LogBox,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme as useMyTheme } from '../../context/themeContext';

import { useTheme } from '@react-navigation/native';
import RadioGroup from 'react-native-radio-buttons-group';
import * as RNFS from 'react-native-fs';

import DocumentReader, {
  DocumentReaderScenario,
  RNRegulaDocumentReader,
  DocumentReaderCompletion,
} from '@regulaforensics/react-native-document-reader-api';

import Permissions from 'react-native-permissions';

var licPath =
  Platform.OS === 'ios'
    ? RNFS.MainBundlePath + '/regula.license'
    : 'regula.license';
var readFile = Platform.OS === 'ios' ? RNFS.readFile : RNFS.readFileAssets;

LogBox.ignoreLogs(['new NativeEventEmitter']);
const eventManager = new NativeEventEmitter(RNRegulaDocumentReader);

export default function HomeScreen({ navigation }) {
  const { changeTheme, theme: myTheme } = useMyTheme();
  const theme = useTheme();

  const [scenarios, setScenarios] = useState([]);
  const [radioButtons, setRadioButtons] = useState([]);
  const [selectedRadioButton, setSelectedRadioButton] = useState({
    id: '1',
    label: 'Mrz',
    value: 'Mrz',
  });

  useEffect(() => {
    async function initializeDocumentReader() {
      readFile(licPath, 'base64').then(license => {
        DocumentReader.initializeReader(
          license,
          response => {
            const scenariosArr = [];
            DocumentReader.getAvailableScenarios(
              currentScenarios => {
                const availabedScenarios = JSON.parse(currentScenarios);
                for (let i in availabedScenarios) {
                  const scenario = DocumentReaderScenario.fromJson(
                    typeof availabedScenarios[i] === 'string'
                      ? JSON.parse(availabedScenarios[i])
                      : availabedScenarios[i],
                  ).name;
                  scenariosArr.push({
                    id: (Number(i) + 1).toString(),
                    label: scenario,
                    value: scenario,
                  });
                }
                setRadioButtons(scenariosArr);
                //console.log('currentScenarios', currentScenarios);
              },
              err => console.log(err),
            );
          },
          err => {
            console.log(err);
          },
        );
      });
    }

    eventManager.addListener('completionEvent', event => {
      const results = DocumentReaderCompletion.fromJson(
        JSON.parse(event['msg']),
      );

      console.log('results', results?.results?.textResult?.fields);
    });

    initializeDocumentReader();
  }, []);

  function handleButtonChange(newButtonsArray) {
    setSelectedRadioButton(
      newButtonsArray.find(button => button.selected === true),
    );
  }

  console.log(selectedRadioButton, 'selectedRadioButton');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ padding: 10, marginBottom: 30 }}
        onPress={() => {
          console.log('pressss');
          console.log(selectedRadioButton.value);
          DocumentReader.setConfig(
            {
              functionality: {
                showTorchButton: true,
                showCloseButton: true,
                showCaptureButton: true,
                showCaptureButtonDelayFromDetect: 3,
                videoCaptureMotionControl: true,
                singleResult: true,
              },
              customization: {
                showResultStatusMessages: true,
                showStatusMessages: true,
                statusTextSize: 18,
                showHelpAnimation: true,
              },
              processParams: {
                scenario: selectedRadioButton.value,
                logs: true,
              },
            },
            response => {},
            error => console.log(error),
          );

          DocumentReader.get;
          DocumentReader.showScanner(
            s => {},
            e => {},
          );
        }}>
        <Text>Scan Document</Text>
      </TouchableOpacity>
      <ScrollView
        style={{ padding: 5, alignSelf: 'center' }}
        showsVerticalScrollIndicator={false}>
        <RadioGroup radioButtons={radioButtons} onPress={handleButtonChange} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    flex: 1,
  },
  button: {
    margin: 10,
    padding: 10,
  },
});
