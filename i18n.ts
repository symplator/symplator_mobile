import i18n from 'i18next';
// eslint-disable-next-line prettier/prettier
import { initReactI18next } from 'react-i18next';
import en_US from './app/public/locales/en_US.json';
import tr from './app/public/locales/tr.json';
import de from './app/public/locales/de.json';
import {DEFAULT_LANGUAGE} from './app/constants/general';

const resources = {
  en_US,
  tr,
  de,
};

export default i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: DEFAULT_LANGUAGE,
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});
