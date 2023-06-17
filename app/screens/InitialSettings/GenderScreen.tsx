import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {InitialSettingsNavigation} from '../../components/InitialSettingsNavigation';
import {Gender} from '../../constants/general';
import {UserSettingsContext} from '../../context/UserSettings/UserSettingsContext';

type Props = {
  navigation: StackNavigationProp<
    InitialSettingsStackParamList,
    'GenderScreen'
  >;
  route: RouteProp<InitialSettingsStackParamList, 'GenderScreen'>;
};

export const GenderScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const userSettingsContext = useContext(UserSettingsContext);
  const {data} = userSettingsContext as UserSettingsContext;
  const [gender, setGender] = useState<Gender | undefined>(
    data.gender as Gender,
  );

  const redirect = (screen: keyof InitialSettingsStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.header}>{t('initialSettings.selectGender')}</Text>
        <View style={styles.genderBtnView}>
          <IconButton
            style={[
              styles.genderBtn,
              gender === Gender.Female && styles.selectedGenderBtn,
            ]}
            icon="human-female"
            size={100}
            onPress={() => setGender(Gender.Female)}
          />
          <IconButton
            style={[
              styles.genderBtn,
              gender === Gender.Male && styles.selectedGenderBtn,
            ]}
            icon="human-male"
            size={100}
            onPress={() => setGender(Gender.Male)}
          />
        </View>
      </View>
      <InitialSettingsNavigation
        previousScreen="WelcomeScreen"
        nextScreen="BirthYearScreen"
        setting={{gender}}
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
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 90,
  },
  genderBtnView: {
    marginTop: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  genderBtn: {
    borderRadius: 10,
  },
  selectedGenderBtn: {
    backgroundColor: '#E0E0E0',
  },
});
