import React, {useEffect, useReducer, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SELECTED_SYMPTOM_LIST_KEY} from '../../constants/general';
import {selectedSymptomsReducer} from '../../context/SelectedSymptomList/SelectedSymptomListReducer';
import {LocalRealmContext} from '../../context/Realm/RealmContext';
import {SelectedSymptomListContext} from '../../context/SelectedSymptomList/SelectedSymptomListContext';
import {getUserIdFromAsyncStorage} from '../../utils/getUserIdFromAsyncStorage';
import {removeItemFromAsyncStorage} from '../../utils/removeItemFromAsyncStorage';
import {BSON} from 'realm';
import {SymptomSchema} from '../../models/Symptom';

interface SelectedSymptomListProviderProps {
  children: React.ReactNode;
}

const {useRealm, useQuery} = LocalRealmContext;

// todo refactor a bit

export const SelectedSymptomListProvider: React.FC<
  SelectedSymptomListProviderProps
> = ({children}) => {
  const [data, dispatch] = useReducer(selectedSymptomsReducer, {symptoms: []});
  const [isLoading, setIsLoading] = useState(true);

  const realm = useRealm();
  const localSymptoms = useQuery(SymptomSchema);

  useEffect(() => {
    const loadData = async () => {
      try {
        const selectedSymptomList = await AsyncStorage.getItem(
          SELECTED_SYMPTOM_LIST_KEY,
        );

        if (
          selectedSymptomList !== null &&
          !Object.keys(selectedSymptomList).length
        ) {
          dispatch({
            type: 'UPDATE_DATA',
            payload: JSON.parse(selectedSymptomList),
          });
        }

        // await removeItemFromAsyncStorage(SELECTED_SYMPTOM_LIST_KEY);
        // dispatch({type: 'RESET_DATA'});
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
      const selectedSymptomListRaw: string = await AsyncStorage.getItem(
        SELECTED_SYMPTOM_LIST_KEY,
      );

      if (selectedSymptomListRaw !== null) {
        const userId = await getUserIdFromAsyncStorage();
        let selectedSymptomList: SelectedSymptomList = {
          _id: new BSON.ObjectId(),
          userId,
          tag: 'My Symptoms', // todo adjust
          date: new Date(), // todo adjust
          createdAt: new Date(),
          updatedAt: new Date(),
          ...JSON.parse(selectedSymptomListRaw),
        };

        realm.write(() => {
          const primaryKeys = selectedSymptomList?.symptoms?.map(s => s._id);
          if (primaryKeys) {
            const symptoms: any = localSymptoms.filter(ls =>
              primaryKeys.includes(ls._id),
            );
            selectedSymptomList = {...selectedSymptomList, symptoms};
          }
          realm.create('SelectedSymptomList', selectedSymptomList);
        });

        await removeItemFromAsyncStorage(SELECTED_SYMPTOM_LIST_KEY);
        dispatch({type: 'RESET_DATA'});
        // realm.close();
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
