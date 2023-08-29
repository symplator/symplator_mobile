import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SelectedSymptomListContext} from './../context/SelectedSymptomList/SelectedSymptomListContext';
import {SelectedSymptomList} from '../components/SelectedSymptomList';
import {StackNavigationProp} from '@react-navigation/stack';
import {SymptomSearch} from '../components/SymptomSearch';

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'HomeScreen'>;
};

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [hasSymptoms, setHasSymptoms] = React.useState(false);
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data, isLoading} =
    selectedSymptomListContext as SelectedSymptomListContext;

  const redirect = (screen: keyof RootStackParams) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    if (!isLoading && data?.symptoms?.length) {
      setHasSymptoms(true);
    } else {
      setHasSymptoms(false);
    }
  }, [data, isLoading]);

  return (
    <View style={styles.main}>
      <View>
        <SymptomSearch hideTitle={hasSymptoms} redirect={redirect} />
        {hasSymptoms ? (
          <SelectedSymptomList showTitle={true} redirect={redirect} />
        ) : (
          <Text>{''}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
    padding: 10,
  },
  translateBtn: {
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    right: 10,
  },
  saveBtn: {
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
});
