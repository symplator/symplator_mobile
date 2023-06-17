import React, {useEffect, useReducer, useState} from 'react';
import UUIDGenerator from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {reducer} from '../context/UserSettings/UserSettingsReducer';
import {isSetupComplete} from '../utils/isSetupComplete';
import {STORAGE_KEY} from '../constants/general';

interface UserSettingsProviderProps {
  children: React.ReactNode;
}

const initialState: UserSettings = {
  currentLanguage: 'en-US',
  targetLanguage: undefined,
  birthYear: undefined,
  gender: undefined,
};

export const UserSettingsProvider: React.FC<UserSettingsProviderProps> = ({
  children,
}) => {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedData !== null) {
          dispatch({
            type: 'UPDATE_DATA',
            payload: JSON.parse(storedData),
          });
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
      setIsLoading(false);
    };
    loadData();
  }, []);

  const updateData = async (newData: UserSettings) => {
    try {
      let payload: UserSettings = {
        ...data,
        ...newData,
      };

      if (isSetupComplete(payload)) {
        const userId = UUIDGenerator.v4() as string;
        payload = {...payload, userId};
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      }
      dispatch({
        type: 'UPDATE_DATA',
        payload,
      });
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  const contextValue: UserSettingsContext = {
    data,
    isLoading,
    updateData,
  };

  return (
    <UserSettingsContext.Provider value={contextValue}>
      {children}
    </UserSettingsContext.Provider>
  );
};
