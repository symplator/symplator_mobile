import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {UserSettingsContext} from '../../context/UserSettings/UserSettingsContext';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

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
  const {data, updateData} = userSettingsContext as UserSettingsContext;

  const redirect = (
    screen: keyof InitialSettingsStackParamList,
    gender: 'female' | 'male' | undefined = undefined,
  ) => {
    if (gender) {
      updateData({
        ...data,
        gender,
      });
    }
    navigation.navigate(screen);
  };

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.headerTxt}>
          {t('initialSettings.selectGender')}
        </Text>
        <View style={styles.genderBtnView}>
          <IconButton
            style={[styles.genderBtn]}
            icon="human-female"
            size={100}
            onPress={() => redirect('AgeScreen', 'female')}
          />
          <IconButton
            style={[styles.genderBtn]}
            icon="human-male"
            size={100}
            onPress={() => redirect('AgeScreen', 'male')}
          />
        </View>
      </View>
      <View style={styles.navButtonsView}>
        <IconButton
          icon="arrow-left"
          onPress={() => redirect('WelcomeScreen')}
        />
      </View>
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
  headerTxt: {
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
    borderWidth: 2,
  },
  navButtonsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: '10%',
  },
});
