interface LanguageButtonsProps {
  mode?:
  | 'text'
  | 'outlined'
  | 'contained'
  | 'elevated'
  | 'contained-tonal'
  | undefined;
  languages: string[];
  handleClick: (text: string) => void;
}

interface LanguageSelectProps {
  languageType: 'currentLanguage' | 'targetLanguage';
  selectedLanguage?: string;
  setLanguage: (language: string) => void;
}

interface InitialSettingsNavigationProps {
  setting: UserSettings;
  previousScreen?: keyof InitialSettingsStackParamList;
  nextScreen?: keyof InitialSettingsStackParamList | 'HomeScreen';
  redirect: (screen: keyof InitialSettingsStackParamList) => void;
}
