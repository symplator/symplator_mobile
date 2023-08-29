import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DEFAULT_LANGUAGE, LANGUAGES} from '../../constants/general';
import {LanguageButtons} from '../../components/LanguageButtons';
import {InitialSettingsNavigation} from '../../components/InitialSettingsNavigation';
import {Text} from 'react-native-paper';

type Props = {
  navigation: StackNavigationProp<InitialSettingsStackParams, 'WelcomeScreen'>;
  route: RouteProp<InitialSettingsStackParams, 'WelcomeScreen'>;
};

export const WelcomeScreen: React.FC<Props> = ({navigation}) => {
  const {t, i18n} = useTranslation();

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
    navigation.navigate('GenderScreen');
  };

  return (
    <View style={styles.main}>
      <View>
        <Text variant="displayMedium" style={styles.appName}>
          {t('appName')}
        </Text>
        <Text variant="bodyMedium" style={styles.welcomeText}>
          {t('initialSettings.welcome1')}
        </Text>
        <LanguageButtons languages={LANGUAGES} handleClick={setUserLanguage} />
      </View>
      <InitialSettingsNavigation
        nextScreen="GenderScreen"
        setting={{currentLanguage}}
        redirect={redirect}
      />
      <Text style={styles.copyright}>{t('initialSettings.copyright')}</Text>
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
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
  },
  appName: {
    // fontSize: 40,
    // fontWeight: 'bold',
    marginTop: '30%',
    marginBottom: '10%',
    textAlign: 'center',
  },
  welcomeText: {
    // fontFamily: 'Roboto, Open Sans',
    // fontSize: 15,
    textAlign: 'center',
    width: '100%',
    marginBottom: '3%',
    color: '#666666',
  },
  copyright: {
    textAlign: 'center',
    color: '#666666',
    marginBottom: '3%',
    fontSize: 12,
  },
});
