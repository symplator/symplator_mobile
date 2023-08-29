import React, {useContext, useState} from 'react';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {SyncedRealmContext} from '../context/Realm/RealmContext';
import {SymptomSchema} from '../models/Symptom';
import {View, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {List, Searchbar} from 'react-native-paper';
import {t} from 'i18next';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {SelectedSymptomList} from '../components/SelectedSymptomList';

const {useQuery} = SyncedRealmContext;

type Props = {
  hideTitle?: boolean;
  navigation?: StackNavigationProp<RootStackParams, 'SymptomTextSearchScreen'>;
};

export const SymptomTextSearchScreen: React.FC<Props> = ({
  hideTitle,
  navigation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Symptom[]>([]);
  const objects = useQuery(SymptomSchema);

  console.log('objects', JSON.stringify(objects, null, 2));

  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage} = userSettingsContext.userSettings;
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data, isLoading, updateData} =
    selectedSymptomListContext as SelectedSymptomListContext;

  const redirect = (screen: keyof RootStackParams) => {
    navigation.navigate(screen);
  };

  const renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <List.Item
        title={
          item?.translations?.find(t => t.language === currentLanguage)?.name
        }
        onPress={() => addSymptomToSelectedList(item)}
      />
    );
  };
  const onSearchTextChange = (text: string): void => {
    setSearchQuery(text);
    if (text.length >= 3) {
      handleSearch(text);
    } else {
      clearSearchResults();
    }
  };

  const handleSearch = async (searchText: string) => {
    try {
      // Split the search query into separate words
      const searchWords = searchText.split(' ');

      // Filter the objects based on each word in the search query for each column
      const filteredResults = Array.from(
        objects
          .filtered(
            searchWords
              ?.map(
                word =>
                  `translations.language="${currentLanguage}" and
                  (translations.name CONTAINS[c] "${word}" or translations.detail CONTAINS[c] "${word}" or
                   translations.tags CONTAINS[c] "${word}")`,
              )
              .join(' AND '),
          )
          .slice(),
      );

      setResults(filteredResults);
    } catch (error) {
      console.error('Error querying Realm:', error);
    }
  };

  const addSymptomToSelectedList = async (symptom: Symptom): Promise<void> => {
    const symptoms = data?.symptoms || [];

    if (!symptomExists(symptom, symptoms)) {
      await updateData({...data, symptoms: [...symptoms, symptom]});
    }

    clearSearchResults();
    clearSearchQuery();
  };

  const symptomExists = (symptom: Symptom, symptoms: Symptom[]): boolean => {
    return symptoms.some(element => element._id === symptom._id);
  };

  const clearSearchResults = () => {
    setResults([]);
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.main}>
      <Searchbar
        placeholder={t('searchPlaceholder')}
        onChangeText={text => onSearchTextChange(text)}
        value={searchQuery}
        style={styles.searchbar}
        showDivider={false}
      />
      <>
        {results?.length > 0 && (
          <FlatList
            style={styles.symptomList}
            horizontal={false}
            data={results}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
          />
        )}
      </>
      {data && !isLoading && (
        <SelectedSymptomList showTitle={!hideTitle} redirect={redirect} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  searchbar: {
    borderRadius: 4,
    backgroundColor: '#fff',
    position: 'relative',
  },
  symptomList: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#e1e8ee',
    zIndex: 9999,
    position: 'absolute',
    left: 0,
    top: 55,
    width: '100%',
    backgroundColor: '#fff',
  },
});
