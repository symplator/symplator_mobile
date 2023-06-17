import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {Symptom} from './models/Symptom';
import {SymplatorRealmContext} from './context/SymplatorRealm/SymplatorRealmContext';
import {UserSettingsContext} from './context/UserSettings/UserSettingsContext';
import {NavigationContainer} from '@react-navigation/native';
import {InitialSettingsStack} from './navigation/InitialSettingsStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from './constants/general';
import {ActivityIndicator} from 'react-native-paper';

const {useQuery} = SymplatorRealmContext;

export const AppSync: React.FC = () => {
  const result = useQuery(Symptom);
  const [filteredSymptom, setFilteredSymptom] = useState('');

  const userSettingsContext = useContext(UserSettingsContext);
  const {data, isLoading} = userSettingsContext as UserSettingsContext;
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    if (data.userId) {
      setUserId(data.userId);
    }
  }, [userId, data]);

  // TODO remove user from async for testing
  async function removeItemFromAsyncStorage(key: string) {
    try {
      console.log('removed async storage ', key);

      await AsyncStorage.removeItem(key);
    } catch (exception) {
      console.error('error removing from async storage: ', exception);
    }
  }
  // TODO remove user from async for testing
  // removeItemFromAsyncStorage(STORAGE_KEY);
  const symptoms = useMemo(() => result.sorted('_id'), [result]);

  //todo turn into searchbox
  // const filterSymptom = () => {
  //   const res = symptoms.filtered('translations.name == "Bas agrisi"');
  //   setFilteredSymptom(res?.[0]._id as string);
  // };

  return (
    <NavigationContainer>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : !userId ? (
        <InitialSettingsStack />
      ) : (
        <>
          <Text>Symptom Ids:</Text>
          {/* <FlatList
            data={symptoms}
            keyExtractor={symptom => symptom._id.toString()}
            renderItem={({item}) => <Text>{item._id}</Text>}
          /> */}
          {/* <Button onPress={() => filterSymptom()} title="Filter" /> */}
          <Text>{filteredSymptom}</Text>
        </>
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
