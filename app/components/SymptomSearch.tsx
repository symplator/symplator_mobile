import {SyncedRealmContext} from '../context/SymplatorRealm/SyncedRealmContext';
import {SymptomSchema} from '../models/Symptom';
import React, {useState, useMemo, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

const {useQuery} = SyncedRealmContext;

const SymptomSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const objects = useQuery(SymptomSchema);

  const handleSearch = async (searchText: string) => {
    setSearchQuery(searchText);

    try {
      // Split the search query into separate words
      const searchWords = searchQuery.split(' ');

      // Filter the objects based on each word in the search query for each column
      const filteredResults = Array.from(
        objects
          // .filtered(
          //   searchWords
          //     .map(word => `(translations.name CONTAINS[c] "${word}") `)
          //     .join(' AND '),
          // )
          // .slice(),
          .filtered(
            'translations.language=$0 and ' +
              '(translations.name CONTAINS[c] $1 or translations.detail CONTAINS[c] $1 or ' +
              ' translations.tags CONTAINS[c] $1)',
            'tr',
            searchWords[0],
          )
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
      <TextInput
        placeholder="Search symptom"
        onChangeText={text => {
          if (text.length >= 3) {
            handleSearch(text);
          }
        }}
      />
      <FlatList
        data={results}
        keyExtractor={(item, _) => item._id}
        renderItem={({item}) => <Text>{item.translations[0].name}</Text>}
      />
    </View>
  );
};

export default SymptomSearch;
