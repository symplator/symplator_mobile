/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-get-random-values';
import {AppProvider} from '@realm/react';
import {App} from './App';
import {name as appName} from './app.json';
import {APP_ID} from '@env';
import './i18n';

const AppWrapper = () => (
  <AppProvider id={APP_ID}>
    <App />
  </AppProvider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);
