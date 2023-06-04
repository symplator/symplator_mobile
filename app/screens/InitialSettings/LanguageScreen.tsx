import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserSettingsContext} from '../../context/UserSettings/UserSettingsContext';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {InitialSettingsNavigation} from '../../components/InitialSettingsNavigation';
import {LanguageSelect} from '../../components/LanguageSelect';

type Props = {
  navigation: StackNavigationProp<
    InitialSettingsStackParamList,
    'LanguageScreen'
  >;
  route: RouteProp<InitialSettingsStackParamList, 'LanguageScreen'>;
};

export const LanguageScreen: React.FC<Props> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const userSettingsContext = useContext(UserSettingsContext);
  const {data} = userSettingsContext as UserSettingsContext;

  const [currentLanguage, setCurrentLanguage] = useState(data.currentLanguage);
  const [targetLanguage, setTargetLanguage] = useState(data.targetLanguage);

  const setUserLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const redirect = (screen: keyof InitialSettingsStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.main}>
      <Text style={styles.header}>{t('initialSettings.setupLanguages')}</Text>
      <View style={styles.langView}>
        <LanguageSelect
          languageType="currentLanguage"
          selectedLanguage={currentLanguage}
          setLanguage={setUserLanguage}
        />
        <LanguageSelect
          languageType="targetLanguage"
          selectedLanguage={targetLanguage}
          setLanguage={setTargetLanguage}
        />
      </View>
      <InitialSettingsNavigation
        previousScreen="AgeScreen"
        nextScreen="WelcomeScreen"
        setting={{currentLanguage, targetLanguage}}
        redirect={redirect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    borderColor: 'white',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 90,
  },
  langView: {
    marginTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxHeight: '50%',
  },
});
