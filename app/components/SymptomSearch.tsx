import {Symptom} from '../models/Symptom';
import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import Realm from 'realm';

const SymptomSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (searchText: string) => {
    setSearchQuery(searchText);

    try {
      const realm = await Realm.open({
        schema: [Symptom],
      });

      const objects = realm.objects('Symptom');
      // Split the search query into separate words
      const searchWords = searchQuery.split(' ');

      // Filter the objects based on each word in the search query for each column
      const filteredResults = Array.from(
        objects
          .filtered(
            searchWords
              .map(
                word =>
                  `(name CONTAINS[c] "${word}") OR (tag CONTAINS[c] "${word}") OR (detail CONTAINS[c] "${word}")`,
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

  return (
    <View>
      <TextInput
        placeholder="Search symptom"
        onChangeText={text => handleSearch(text)}
        // onSubmitEditing={handleSearch}
      />
      <FlatList
        data={results}
        keyExtractor={(item, _) => item._id}
        renderItem={({item}) => <Text>item.translations[0].name</Text>}
      />
    </View>
  );
};

export default SymptomSearch;
