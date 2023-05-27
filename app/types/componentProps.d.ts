interface LanguageSelectButtonsProps {
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
