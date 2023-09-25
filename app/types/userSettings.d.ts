type Gender = 'woman' | 'man';

interface UserSettings {
  userId?: string;
  currentLanguage?: string;
  targetLanguage?: string;
  birthYear?: number;
  gender?: Gender;
}

type UserSettingsAction = {
  type: 'UPDATE_DATA';
  payload: Partial<UserSettings>;
};

interface UserSettingsContext {
  userSettings: UserSettings;
  isLoading?: boolean;
  updateData: (newData: UserSettings) => Promise<void>;
}
