import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeItemFromAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from async storage: `, error);
  }
};
