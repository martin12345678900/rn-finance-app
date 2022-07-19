import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  NativeEventEmitter,
  LogBox,
  Button,
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
  Enum,
  ScenarioIdentifier,
} from '@regulaforensics/react-native-document-reader-api';

import Permissions from 'react-native-permissions';

// const licenseProps = Platform.select({
//   ios: {
//     path: `${RNFS.MainBundlePath}/regula.license`,
//     readFunc: RNFS.readFile
//   },
//   android: {
//     path: `regula.license`,
//     readFunc: RNFS.readFileAssets
//   }
// })



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

  const [radioButtons, setRadioButtons] = useState([]);
  const [selectedRadioButton, setSelectedRadioButton] = useState({
    id: '1',
    label: 'Mrz',
    value: 'Mrz',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function initializeDocumentReader() {
      readFile(licPath, 'base64').then(license => {
        console.log('license:', license)
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
                setLoading(false);
              },
              err => console.log(err),
            );
          },
          err => {
            console.log('err', err);
          },
        );
      });
    }

    eventManager.addListener('completionEvent', event => {
      const results = DocumentReaderCompletion.fromJson(
        JSON.parse(event['msg']),
      );

      if (results?.results?.textResult?.fields) {
        const resultsArr = [];
        results.results.textResult.fields.forEach(field => {
          resultsArr.push({
            fieldName: field.fieldName,
            fieldType: field.fieldType,
            value: field.values.map(value => value.value)[0],
            // values: field.values.map(value => ({
            //   sourceType: value.sourceType,
            //   value: value.value,
            //   originalValue: value.originalValue,
            //   pageIndex: value.pageIndex,
            // })),
          });
        });
        setResults(resultsArr);
      }
    });

    initializeDocumentReader();

    //return () => eventManager.removeAllListeners();
  }, []);

  function handleButtonChange(newButtonsArray) {
    setSelectedRadioButton(newButtonsArray.find(b => b.selected));
  }

  function clearResults() {
    setResults([]);
  }

  // DocumentReader.getLicenseExpiryDate(
  //   expireDate => {
  //     //console.log(expireDate, 'expireDate');
  //   },
  //   error => {
  //     //console.log(error);
  //   },
  // );

  console.log('results', results);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: theme.colors.white,
              borderRadius: 10,
              margin: 15,
            }}
            onPress={() => {
              console.log('pressss');
              DocumentReader.setConfig(
                {
                  functionality: {
                    // showCaptureButtonDelayFromDetect: 15,
                    //videoCaptureMotionControl: true,
                    //singleResult: true,
                    // showCameraSwitchButton: true,
                    captureMode: Enum.CaptureMode.CAPTURE_FRAME,
                  },
                  customization: {
                    showStatusMessages: true,
                    statusTextSize: 18,
                    showHelpAnimation: true,
                  },
                  processParams: {
                    scenario: ScenarioIdentifier.SCENARIO_FULL_PROCESS,
                    captureButtonScenario:
                      ScenarioIdentifier.SCENARIO_FULL_PROCESS,
                    //timeoutFromFirstDetect: 5.0,
                  },
                },
                response => { },
                error => console.log(error),
              );

              DocumentReader.showScanner(
                s => { },
                e => { },
              );
            }}>
            <Text style={{ color: theme.colors.black }}>Scan Document</Text>
          </TouchableOpacity>
          <Button onPress={clearResults} title="Clear Results" />
          <ScrollView>
            <Text>{JSON.stringify(results)}</Text>
          </ScrollView>
        </>
      )}
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
