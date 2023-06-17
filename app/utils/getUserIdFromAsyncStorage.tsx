import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_SETTINGS_KEY} from './../constants/general';

export const getUserIdFromAsyncStorage = async (): Promise<
  string | undefined
> => {
  const userSettings = await AsyncStorage.getItem(USER_SETTINGS_KEY);
  if (userSettings !== null) {
    const {userId} = JSON.parse(userSettings);
    return userId;
  }
};
