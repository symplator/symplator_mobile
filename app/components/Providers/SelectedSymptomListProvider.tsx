import React, {useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SELECTED_SYMPTOM_LIST_KEY} from '../../constants/general';
import {selectedSymptomsReducer} from '../../context/SelectedSymptomList/SelectedSymptomListReducer';
import {LocalRealmContext} from '../../context/SymplatorRealm/SyncedRealmContext';
import {SelectedSymptomListContext} from '../../context/SelectedSymptomList/SelectedSymptomListContext';
import {getUserIdFromAsyncStorage} from '../../utils/getUserIdFromAsyncStorage';
import {removeItemFromAsyncStorage} from '../../utils/removeItemFromAsyncStorage';
import {BSON} from 'realm';

interface SelectedSymptomListProviderProps {
  children: React.ReactNode;
}

const {useRealm} = LocalRealmContext;

// todo refactor a bit

export const SelectedSymptomListProvider: React.FC<
  SelectedSymptomListProviderProps
> = ({children}) => {
  const [data, dispatch] = useReducer(selectedSymptomsReducer, undefined);
  const [isLoading, setIsLoading] = useState(true);

  const realm = useRealm();

  useEffect(() => {
    const loadData = async () => {
      try {
        const selectedSymptomList = await AsyncStorage.getItem(
          SELECTED_SYMPTOM_LIST_KEY,
        );

        if (selectedSymptomList !== null) {
          dispatch({
            type: 'UPDATE_DATA',
            payload: JSON.parse(selectedSymptomList),
          });
        }
      } catch (error) {
        console.error(
          'Error loading selected symptoms list from database:',
          error,
        );
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const updateData = async (newData: SelectedSymptomList) => {
    try {
      let payload: SelectedSymptomList = {
        ...data,
        ...newData,
      };

      await AsyncStorage.setItem(
        SELECTED_SYMPTOM_LIST_KEY,
        JSON.stringify(payload),
      );

      dispatch({
        type: 'UPDATE_DATA',
        payload,
      });
    } catch (error) {
      console.error('Error saving draft selected symptom list:', error);
    }
  };

  const saveData = async () => {
    try {
      let selectedSymptomList = await AsyncStorage.getItem(
        SELECTED_SYMPTOM_LIST_KEY,
      );

      if (selectedSymptomList !== null) {
        const userId = await getUserIdFromAsyncStorage();
        selectedSymptomList = {
          _id: new BSON.ObjectId(),
          userId,
          title: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          ...JSON.parse(selectedSymptomList),
        };

        realm.write(() => {
          realm.create('SelectedSymptomList', selectedSymptomList);
        });

        await removeItemFromAsyncStorage(SELECTED_SYMPTOM_LIST_KEY);
        realm.close();
      }
    } catch (error) {
      console.error('Error saving selected symptom list to database:', error);
    }
  };

  const contextValue: SelectedSymptomListContext = {
    data,
    isLoading,
    updateData,
    saveData,
  };

  return (
    <SelectedSymptomListContext.Provider value={contextValue}>
      {children}
    </SelectedSymptomListContext.Provider>
  );
};
