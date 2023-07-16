import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {SyncedRealmContext} from '../context/SymplatorRealm/SyncedRealmContext';
import {SymptomSchema} from '../models/Symptom';
import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {List, Searchbar} from 'react-native-paper';

const {useQuery} = SyncedRealmContext;

const SymptomSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Symptom[]>([]);
  const objects = useQuery(SymptomSchema);

  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage} = userSettingsContext.userSettings;

  const handleSearch = async (searchText: string) => {
    try {
      // Split the search query into separate words
      const searchWords = searchText.split(' ');

      // Filter the objects based on each word in the search query for each column
      const filteredResults = Array.from(
        objects
          .filtered(
            searchWords
              .map(
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
      // filteredResults.forEach(tr => {
      //   console.log('item *********************** ');
      //   console.log('name:' + tr.translations[0].name);
      //   console.log('detail:' + tr.translations[0].detail);
      //   console.log('tags:' + tr.translations[0].tags);
      // });
      console.log('----------------------------------');
    } catch (error) {
      console.error('Error querying Realm:', error);
    }
  };

  return (
    <View>
      <Searchbar
        placeholder="Search symptom"
        onChangeText={text => {
          setSearchQuery(text);
          if (text.length >= 3) {
            handleSearch(text);
          }
        }}
        value={searchQuery}
      />
      <>
        {results?.map(symptom => (
          <List.Item
            key={symptom._id}
            title={
              symptom?.translations?.find(t => t.language === currentLanguage)
                ?.name
            }
            onPress={() => console.log('symptom added')}
          />
        ))}
      </>
    </View>
  );
};

export default SymptomSearch;
