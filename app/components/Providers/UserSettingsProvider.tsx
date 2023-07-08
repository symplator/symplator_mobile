import React, {useEffect, useReducer, useState} from 'react';
import UUIDGenerator from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserSettingsContext} from '../../context/UserSettings/UserSettingsContext';
import {userSettingsReducer} from '../../context/UserSettings/UserSettingsReducer';
import {isSetupComplete} from '../../utils/isSetupComplete';
import {USER_SETTINGS_KEY} from '../../constants/general';

interface UserSettingsProviderProps {
  children: React.ReactNode;
}

const initialState: UserSettings = {
  currentLanguage: 'en-US',
  targetLanguage: undefined,
  birthYear: undefined,
  gender: undefined,
};

// todo refactor a bit

export const UserSettingsProvider: React.FC<UserSettingsProviderProps> = ({
  children,
}) => {
  const [data, dispatch] = useReducer(userSettingsReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userSettings = await AsyncStorage.getItem(USER_SETTINGS_KEY);

        if (userSettings !== null) {
          dispatch({
            type: 'UPDATE_DATA',
            payload: JSON.parse(userSettings),
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
        await AsyncStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(payload));
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
    userSettings: data,
    isLoading,
    updateData,
  };

  return (
    <UserSettingsContext.Provider value={contextValue}>
      {children}
    </UserSettingsContext.Provider>
  );
};
