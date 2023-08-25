import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import React from 'react';
import {TranslatedSymptomList} from '../components/TranslatedSymptomList';
type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SymptomDetailScreen'>;
  route: RouteProp<RootStackParams, 'SymptomDetailScreen'>;
};

export const SymptomDetailScreen: React.FC<Props> = ({route}) => {

  const savedSymptom = route.params?.data;

  console.log(savedSymptom.symptoms);
  return (
    <View>
      <Text>{savedSymptom.tag}</Text>
      <Text>{new Date(savedSymptom.date).toLocaleDateString()}</Text>
      <TranslatedSymptomList
        isTranslated={false}
        data={savedSymptom.symptoms}
      />
    </View>
  );
};
