import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {SelectedSymptomListContext} from './../context/SelectedSymptomList/SelectedSymptomListContext';
import {SelectedSymptomList} from '../components/SelectedSymptomList';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {SymptomSearch} from '../components/SymptomSearch';

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'HomeScreen'>;
};

// todo test component to be adjusted
export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data} = selectedSymptomListContext as SelectedSymptomListContext;

  const saveAndRedirect = () => {
    navigation.navigate('TranslationScreen');
  };

  return (
    <View style={styles.main}>
      <View>
        <SymptomSearch />
        {/* <View style={styles.genderBtnView} /> */}
        <SelectedSymptomList />
      </View>
      <Button
        style={styles.saveBtn}
        dark={true}
        compact={false}
        mode="contained"
        disabled={!data?.symptoms?.length}
        onPress={saveAndRedirect}>
        {t('translate')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    // borderColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
    padding: 10,
    // borderWidth: 3,
    // borderColor: 'red',
    // borderStyle: 'solid',
  },
  // header: {
  //   textAlign: 'center',
  //   fontSize: 20,
  //   marginTop: 90,
  // },
  // genderBtnView: {
  //   marginTop: 100,
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-evenly',
  // },
  // searchBtn: {
  //   borderRadius: 4,
  // },
  saveBtn: {
    borderRadius: 4,
    bottom: 20,
    left: 10,
    width: '100%',
  },
});
