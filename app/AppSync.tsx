import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {en, de, tr, registerTranslation} from 'react-native-paper-dates';
import {LocalRealmContext} from './context/Realm/RealmContext';
import {UserSettingsContext} from './context/UserSettings/UserSettingsContext';
import {InitialSettingsStack} from './navigation/InitialSettingsStack';
import {SelectedSymptomListProvider} from './components/Providers/SelectedSymptomListProvider';
import {RootStackNavigator} from './navigation/RootStack';
// import {removeItemFromAsyncStorage} from './utils/removeItemFromAsyncStorage';
// import {USER_SETTINGS_KEY} from './constants/general';

export const AppSync: React.FC = () => {
  const {i18n} = useTranslation();
  const userSettingsContext = useContext(UserSettingsContext);
  const {userSettings, isLoading} = userSettingsContext as UserSettingsContext;
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    if (userSettings.userId) {
      setUserId(userSettings.userId);
    }

    if (userSettings.currentLanguage) {
      i18n.changeLanguage(userSettings.currentLanguage);
      const translations = {en, de, tr};
      const locale =
        userSettings.currentLanguage === 'en_US'
          ? 'en'
          : userSettings.currentLanguage;

      registerTranslation(locale, translations[locale]);
    }
  }, [userSettings, i18n]);

  // todo remove user from async for testing
  // removeItemFromAsyncStorage(USER_SETTINGS_KEY);

  const {RealmProvider: LocalRealmProvider} = LocalRealmContext;

  return (
    <NavigationContainer>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : !userId ? (
        <InitialSettingsStack />
      ) : (
        <LocalRealmProvider>
          <SelectedSymptomListProvider>
            <RootStackNavigator />
          </SelectedSymptomListProvider>
        </LocalRealmProvider>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
