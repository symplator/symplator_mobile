interface UserSettings {
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
  data: UserSettings | null;
  updateData: (newData: UserSettings) => void;
}
