import React, {useMemo, useState} from 'react';
import {Button, FlatList, Text} from 'react-native';
import {Symptom} from './models/Symptom';
import {SymplatorRealmContext} from './models';

const {useQuery} = SymplatorRealmContext;

export const AppSync: React.FC = () => {
  const result = useQuery(Symptom);
  const [filteredSymptom, setFilteredSymptom] = useState('');

  const symptoms = useMemo(() => result.sorted('_id'), [result]);

  //todo turn into searchbox
  const filterSymptom = () => {
    const res = symptoms.filtered('translations.name == "Bas agrisi"');
    setFilteredSymptom(res?.[0]._id as string);
  };

  return (
    <>
      <Text>Symptom Ids:</Text>
      <FlatList
        data={symptoms}
        keyExtractor={symptom => symptom._id.toString()}
        renderItem={({item}) => <Text>{item._id}</Text>}
      />
      <Button onPress={() => filterSymptom()} title="Filter" />
      <Text>{filteredSymptom}</Text>
    </>
  );
};
