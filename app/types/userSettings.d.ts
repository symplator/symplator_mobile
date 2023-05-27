interface UserSettings {
  userId?: string;
  currentLanguage: string;
  targetLanguage: string;
  birthYear: number;
  gender: 'male' | 'female';
}

type Action = {
  type: 'UPDATE_DATA';
  payload: Partial<UserSettings>;
};

interface UserSettingsContext {
  data: UserSettings;
  updateData: (newData: UserSettings) => void;
  saveData: (newData: UserSettings) => void;
}
