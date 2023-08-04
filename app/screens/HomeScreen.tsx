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

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data} = selectedSymptomListContext as SelectedSymptomListContext;

  const redirect = (screen: keyof RootStackParams) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.main}>
      <View>
        <SymptomSearch />
        <SelectedSymptomList />
      </View>
      {data?.symptoms?.length ? (
        <View>
          <Button
            style={styles.translateBtn}
            dark={true}
            compact={false}
            mode="contained"
            disabled={!data?.symptoms?.length}
            onPress={() => redirect('TranslationScreen')}>
            {t('translate')}
          </Button>
          <Button
            style={styles.saveBtn}
            dark={true}
            compact={false}
            mode="contained"
            disabled={!data?.symptoms?.length}
            onPress={() => redirect('SaveSymptomListScreen')}>
            {t('save')}
          </Button>
        </View>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
    padding: 10,
  },
  translateBtn: {
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  saveBtn: {
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
});
