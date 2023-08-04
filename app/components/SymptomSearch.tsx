import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {SyncedRealmContext} from '../context/Realm/RealmContext';
import {SymptomSchema} from '../models/Symptom';
import React, {useContext, useState} from 'react';
import {View, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import {List, Searchbar} from 'react-native-paper';
import {t} from 'i18next';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import { grey200 } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

const {useQuery} = SyncedRealmContext;
export const SymptomSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Symptom[]>([]);
  const objects = useQuery(SymptomSchema);

  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage} = userSettingsContext.userSettings;
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {updateData} = selectedSymptomListContext as SelectedSymptomListContext;

  const {data} = selectedSymptomListContext as SelectedSymptomListContext;

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
      console.log('Filtered results:' + filteredResults.length);
      console.log('----------------------------------');
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
    <View style={styles.list}>
      <Searchbar
        placeholder={t('search')}
        onChangeText={text => onSearchTextChange(text)}
        value={searchQuery}
      />
      <>
        <FlatList
          style={styles.symptomList}
          horizontal={false}
          data={results}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
    marginBottom: 20,
  },
  symptomList: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#e1e8ee',
    marginHorizontal: 10,
  },
});
