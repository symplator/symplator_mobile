import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {UserSettingsContext} from '../../context/UserSettings/UserSettingsContext';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {InitialSettingsNavigation} from '../../components/InitialSettingsNavigation';
import {LanguageSelect} from '../../components/LanguageSelect';
import {Text} from 'react-native-paper';

type Props = {
  navigation: StackNavigationProp<
    RootStackParams & InitialSettingsStackParams,
    'LanguageScreen'
  >;
};

export const LanguageScreen: React.FC<Props> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const userSettingsContext = useContext(UserSettingsContext);
  const {userSettings: data} = userSettingsContext as UserSettingsContext;

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

  const redirect = (
    screen: keyof InitialSettingsStackParams | 'HomeScreen',
  ) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.main}>
      <Text variant="titleLarge" style={styles.header}>
        {t('initialSettings.setupLanguages')}
      </Text>
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
          excludedLanguage={currentLanguage}
        />
      </View>
      <InitialSettingsNavigation
        previousScreen="BirthYearScreen"
        nextScreen="HomeScreen"
        setting={{currentLanguage, targetLanguage}}
        redirect={redirect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#F5F5F5',
    color: '#333333',
    borderColor: 'white',
    fontFamily: 'Roboto, Open Sans',
  },
  header: {
    textAlign: 'center',
    // fontSize: 20,
    marginTop: 90,
  },
  langView: {
    marginTop: 40,
    width: '90%',
    marginLeft: '5%',
    display: 'flex',
    justifyContent: 'space-between',
    height: '35%',
  },
});
