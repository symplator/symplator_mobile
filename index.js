/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {AppProvider} from '@realm/react';
import {App} from './App';
import {name as appName} from './app.json';
import {REALM_CONFIG} from './app/configs/realm.config';

const AppWrapper = () => (
  <AppProvider id={REALM_CONFIG.appId}>
    <App />
  </AppProvider>
);

AppRegistry.registerComponent(appName, () => AppWrapper);
