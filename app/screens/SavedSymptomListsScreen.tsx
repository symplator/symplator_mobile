import React, {useMemo, useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SavedSymptomLists} from '../components/SavedSymptomLists';
import {LocalRealmContext} from '../context/Realm/RealmContext';
import {SelectedSymptomListSchema} from '../models/SelectedSymptomList';
import {getUserIdFromAsyncStorage} from '../utils/getUserIdFromAsyncStorage';

const {useQuery} = LocalRealmContext;

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SavedSymptomListsScreen'>;
};

export const SavedSymptomListsScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const [userId, setUserId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [symptomLists, setSymptomLists] = useState<Realm.Results<
    SelectedSymptomListSchema & Realm.Object<unknown, never>
  > | null>(null);
  let symptomListsResult;

  useEffect(() => {
    const getUserId = async () => {
      setUserId(await getUserIdFromAsyncStorage());
    };
    getUserId();
  }, []);

  const result = useQuery(SelectedSymptomListSchema);
  symptomListsResult = useMemo(
    () => result.filtered('userId == $0', userId).sorted('_id', true),
    [result, userId],
  );

  useEffect(() => {
    if (!symptomLists && symptomListsResult.length) {
      setSymptomLists(symptomListsResult);
    }
    if (userId && symptomListsResult) {
      setIsLoading(false);
    }
  }, [symptomLists, symptomListsResult, userId]);

  return (
    <>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : symptomLists?.length ? (
        <SavedSymptomLists
          symptomLists={symptomLists}
          navigation={navigation}
        />
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
  loader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
