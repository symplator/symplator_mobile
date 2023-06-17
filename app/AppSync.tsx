import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {LocalRealmContext} from './context/SymplatorRealm/SyncedRealmContext';
import {UserSettingsContext} from './context/UserSettings/UserSettingsContext';
import {NavigationContainer} from '@react-navigation/native';
import {InitialSettingsStack} from './navigation/InitialSettingsStack';
import {ActivityIndicator} from 'react-native-paper';
import {SelectedSymptomListProvider} from './components/Providers/SelectedSymptomListProvider';
import {HomeScreen} from './screens/HomeScreen';
// import {removeItemFromAsyncStorage} from './utils/removeItemFromAsyncStorage';
// import {USER_SETTINGS_KEY} from './constants/general';

export const AppSync: React.FC = () => {
  const userSettingsContext = useContext(UserSettingsContext);
  const {data, isLoading} = userSettingsContext as UserSettingsContext;
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    if (data.userId) {
      setUserId(data.userId);
    }
  }, [userId, data]);

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
            <HomeScreen />
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
