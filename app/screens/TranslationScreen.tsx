import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import React, {useContext} from 'react';
import {Button, Card, List} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {TranslatedSymptomList} from '../components/TranslatedSymptomList';

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'TranslationScreen'>;
};


export const TranslationScreen: React.FC<Props> = ({navigation}) => {
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data} = selectedSymptomListContext as SelectedSymptomListContext;

  const {t} = useTranslation();

  return (
    <View style={styles.main}>
      <Card>
        <TranslatedSymptomList isTranslated={true} data={data} />
      </Card>

      <Button
        style={styles.exportButton}
        dark={true}
        compact={false}
        mode="contained"
        disabled={!data?.symptoms?.length}>
        {t('export')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  exportButton: {
    borderRadius: 4,
    width: '100%',
    marginBottom: 20,
  },
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

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
});
