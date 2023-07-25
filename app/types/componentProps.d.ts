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
  excludedLanguage?: string;
  setLanguage: (language: string) => void;
}

interface InitialSettingsNavigationProps {
  setting: UserSettings;
  previousScreen?: keyof InitialSettingsStackParams;
  nextScreen?: keyof InitialSettingsStackParams | 'HomeScreen';
  redirect: (screen: keyof InitialSettingsStackParams | 'HomeScreen') => void;
}

interface SelectedSymptomListProps {
  isTranslated?: boolean;
  icon?: import('react').ReactNode;
  showTitle?: boolean;
}
