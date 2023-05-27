import React, {useContext, useMemo, useState} from 'react';
import {Button, FlatList, Text} from 'react-native';
import {Symptom} from './models/Symptom';
import {SymplatorRealmContext} from './models';
import {UserSettingsContext} from './context/UserSettings/UserSettingsContext';
import {NavigationContainer} from '@react-navigation/native';
import {InitialSettingsStack} from './navigation/InitialSettingsStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEY} from './constants/general';

const {useQuery} = SymplatorRealmContext;

export const AppSync: React.FC = () => {
  const result = useQuery(Symptom);
  const [filteredSymptom, setFilteredSymptom] = useState('');

  const userSettingsContext = useContext(UserSettingsContext);
  const {data} = userSettingsContext as UserSettingsContext;

  const userId = data.userId;

  // TODO remove user from async for testing
  async function removeItemFromAsyncStorage(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (exception) {
      console.error('error removing from async storage: ', exception);
    }
  }
  removeItemFromAsyncStorage(STORAGE_KEY);
  // TODO remove user from async for testing

  const symptoms = useMemo(() => result.sorted('_id'), [result]);

  //todo turn into searchbox
  const filterSymptom = () => {
    const res = symptoms.filtered('translations.name == "Bas agrisi"');
    setFilteredSymptom(res?.[0]._id as string);
  };

  return (
    <NavigationContainer>
      {!userId ? (
        <InitialSettingsStack />
      ) : (
        <>
          <Text>Symptom Ids:</Text>
          <FlatList
            data={symptoms}
            keyExtractor={symptom => symptom._id.toString()}
            renderItem={({item}) => <Text>{item._id}</Text>}
          />
          <Button onPress={() => filterSymptom()} title="Filter" />
          <Text>{filteredSymptom}</Text>
        </>
      )}
    </NavigationContainer>
  );
};
