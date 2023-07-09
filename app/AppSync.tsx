import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {LocalRealmContext} from './context/SymplatorRealm/SyncedRealmContext';
import {UserSettingsContext} from './context/UserSettings/UserSettingsContext';
import {NavigationContainer} from '@react-navigation/native';
import {InitialSettingsStack} from './navigation/InitialSettingsStack';
import {ActivityIndicator} from 'react-native-paper';
import {SelectedSymptomListProvider} from './components/Providers/SelectedSymptomListProvider';
import {HomeScreen} from './screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
// import {removeItemFromAsyncStorage} from './utils/removeItemFromAsyncStorage';
// import {USER_SETTINGS_KEY} from './constants/general';
const Stack = createStackNavigator<RootStackParams>();

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
    }
  }, [userId, userSettings, i18n]);

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
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
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
