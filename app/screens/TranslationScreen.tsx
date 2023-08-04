import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import React, {useContext} from 'react';
import {Button, Card, List} from 'react-native-paper';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {useTranslation} from 'react-i18next';

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'TranslationScreen'>;
};

type symptomProps = {
  isTranslated: boolean;
  data: any;
};
const SymptomList: React.FC<symptomProps> = ({isTranslated, data}) => {
  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage, targetLanguage} = userSettingsContext.userSettings;

  data?.symptoms?.map(symptom => {
    console.log(
      'Symptom name : ',
      symptom?.translations?.find(t => t.language === targetLanguage)?.name,
    );
    console.log(
      'Symptom detail : ',
      symptom?.translations?.find(t => t.language === targetLanguage)?.detail,
    );
  });
  console.log;
  return (
    <View>
      {data?.symptoms?.map(symptom => (
        <List.Accordion
          style={{borderRadius: 10}}
          key={symptom._id}
          title={
            symptom?.translations?.find(t =>
              isTranslated
                ? t.language === targetLanguage
                : t.language === currentLanguage,
            )?.name
          }
          titleStyle={{marginBottom: 10, fontSize: 17}}
          titleNumberOfLines={2}
          description={
            isTranslated
              ? symptom?.translations?.find(t => t.language === currentLanguage)
                  ?.name
              : ''
          }
          descriptionStyle={{color:'grey'}}>
          <List.Item
            title={
              symptom?.translations?.find(t =>
                isTranslated
                  ? t.language === targetLanguage
                  : t.language === currentLanguage,
              )?.detail
            }
          />
        </List.Accordion>
      ))}
    </View>
  );
};
export const TranslationScreen: React.FC<Props> = ({navigation}) => {
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data} = selectedSymptomListContext as SelectedSymptomListContext;

  const {t} = useTranslation();

  return (
    <View style={styles.main}>
      <Card>
        <SymptomList isTranslated={true} data={data} />
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
