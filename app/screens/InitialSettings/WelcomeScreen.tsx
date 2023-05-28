import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {UserSettingsContext} from '../../context/UserSettings/UserSettingsContext';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DEFAULT_LANGUAGE, LANGUAGES} from '../../constants/general';
import {LanguageSelectButtons} from '../../components/LanguageSelectButtons';

type Props = {
  navigation: StackNavigationProp<
    InitialSettingsStackParamList,
    'WelcomeScreen'
  >;
  route: RouteProp<InitialSettingsStackParamList, 'WelcomeScreen'>;
};

export const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const userSettingsContext = useContext(UserSettingsContext);
  const {data, updateData} = userSettingsContext as UserSettingsContext;

  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);

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

  const redirect = () => {
    updateData({
      ...data,
      currentLanguage,
    });
    navigation.navigate('GenderScreen');
  };

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.appName}>{t('initialSettings.appName')}</Text>
        <Text style={styles.welcomeText}>{t('initialSettings.welcome1')}</Text>
        <LanguageSelectButtons
          languages={LANGUAGES}
          handleClick={setUserLanguage}
        />
      </View>
      <View>
        <IconButton
          icon="arrow-right"
          style={styles.forwardBtn}
          onPress={() => redirect()}
        />
        <Text style={styles.copyright}>{t('initialSettings.copyright')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5F5F5',
    color: '#333333',
    height: '100%',
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: '30%',
    marginBottom: '10%',
    textAlign: 'center',
  },
  welcomeText: {
    fontFamily: 'Roboto, Open Sans',
    fontSize: 15,
    textAlign: 'center',
    width: '100%',
    marginBottom: '3%',
    color: '#666666',
  },
  forwardBtn: {
    marginLeft: '85%',
    marginBottom: '5%',
  },
  copyright: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: '3%',
    fontSize: 12,
  },
});
