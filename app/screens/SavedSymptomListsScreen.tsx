import React, {useMemo} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SavedSymptomLists} from '../components/SavedSymptomLists';
import {LocalRealmContext} from '../context/Realm/RealmContext';
import {SelectedSymptomListSchema} from '../models/SelectedSymptomList';

const {useQuery} = LocalRealmContext;

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SavedSymptomListsScreen'>;
};

export const SavedSymptomListsScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const result = useQuery(SelectedSymptomListSchema);
  const symptomLists = useMemo(() => result.sorted('_id', true), [result]);

  return (
    <>
      {symptomLists?.length ? (
        <SavedSymptomLists symptomLists={symptomLists} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.txt}>{t('noSavedSymptomList')}</Text>
          <Button
            dark={true}
            compact={false}
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate('HomeScreen')}>
            {t('searchSymptoms')}
          </Button>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF !important',
  },
  txt: {
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 25,
  },
  btn: {
    width: '40%',
    color: '#FFFFFF',
    borderRadius: 4,
  },
});
