import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TranslatedSymptomList} from '../components/TranslatedSymptomList';
import {Button, Card, Text} from 'react-native-paper';
type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SymptomDetailScreen'>;
  route: RouteProp<RootStackParams, 'SymptomDetailScreen'>;
};

export const SymptomDetailScreen: React.FC<Props> = ({route}) => {
  const savedSymptom = route.params?.data;
  const [showTranslated, setShowTranslated] = React.useState<boolean>(false);
  return (
    <View>
      <Text variant="titleLarge" style={styles.tagText}>
        {savedSymptom.tag} 
      </Text>
      <Text variant="titleLarge" style={styles.tagText}>
        {new Date(savedSymptom.date).toLocaleDateString()}
      </Text>
      <TranslatedSymptomList
        isTranslated={showTranslated}
        data={savedSymptom}
      />
      <Button onPress={() => setShowTranslated(!showTranslated)}>
        {showTranslated ? 'Show Original' : 'Show Translated'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  tagText: {
    marginVertical: 10,
  },
});
