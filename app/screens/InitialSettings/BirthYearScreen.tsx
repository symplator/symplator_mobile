import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {getYears} from '../../utils/getYears';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {InitialSettingsNavigation} from '../../components/InitialSettingsNavigation';
import {UserSettingsContext} from '../../context/UserSettings/UserSettingsContext';

type Props = {
  navigation: StackNavigationProp<
    InitialSettingsStackParamList,
    'BirthYearScreen'
  >;
  route: RouteProp<InitialSettingsStackParamList, 'BirthYearScreen'>;
};

export const BirthYearScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const userSettingsContext = useContext(UserSettingsContext);
  const {data} = userSettingsContext as UserSettingsContext;

  const [birthYear, setBirthYear] = useState(data.birthYear);
  const [years, setYears] = useState<string[]>([]);
  const [defaultItemIndex, setDefaultItemIndex] = useState(0);

  useEffect(() => {
    const {yearItems, defaultIndex} = getYears();
    setYears(yearItems);
    setDefaultItemIndex(defaultIndex);
  }, []);

  const redirect = (screen: keyof InitialSettingsStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.header}>
          {t('initialSettings.selectBirthYear')}
        </Text>
        <View style={styles.yearPickerContainer}>
          <WheelPicker
            selectedItemTextFontFamily="Roboto, sans-serif"
            itemTextFontFamily="Roboto, sans-serif"
            itemTextSize={20}
            selectedItemTextSize={22}
            data={years}
            selectedItem={defaultItemIndex}
            onItemSelected={item => setBirthYear(+years[item])}
          />
        </View>
      </View>
      <InitialSettingsNavigation
        previousScreen="GenderScreen"
        nextScreen="LanguageScreen"
        setting={{birthYear}}
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
  yearPickerContainer: {
    marginTop: 80,
    marginLeft: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
