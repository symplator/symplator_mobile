import React, {useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserSettingsContext} from './UserSettingsContext';
import {reducer} from './UserSettingsReducer';
const STORAGE_KEY: string = '@userId';

interface UserSettingsProviderProps {
  children: React.ReactNode;
}

const initialState: UserSettings = {
  currentLanguage: 'en-US',
  targetLanguage: '',
  birthYear: 1996,
  gender: 'female',
};

export const UserSettingsProvider: React.FC<UserSettingsProviderProps> = ({
  children,
}) => {
  const [data, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadData();
  }, []);

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
  };

  const updateData = async (newData: UserSettings) => {
    try {
      const payload = {
        ...data,
        ...newData,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
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
    updateData,
  };

  return (
    <UserSettingsContext.Provider value={contextValue}>
      {children}
    </UserSettingsContext.Provider>
  );
};
