type Gender = 'female' | 'male';

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
  data: UserSettings;
  isLoading?: boolean;
  updateData: (newData: UserSettings) => void;
}
