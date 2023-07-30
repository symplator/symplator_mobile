import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import React, {useContext, useState} from 'react';
import {Button, Card, List} from 'react-native-paper';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import FlipCard from 'react-native-flip-card';
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
          key={symptom._id}
          title={
            symptom?.translations?.find(t =>
              isTranslated
                ? t.language === targetLanguage
                : t.language === currentLanguage,
            )?.name
          }
          titleNumberOfLines={2}>
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
  const [translated, setTranslated] = useState<boolean>(true);
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data} = selectedSymptomListContext as SelectedSymptomListContext;

  const {t} = useTranslation();

  const toggleTranslated = () => {
    setTranslated(!translated);
  };
  return (
    <View style={styles.main}>
      <FlipCard
        flipHorizontal={true}
        flipVertical={false}
        perspective={1000}
        style={{
          backgroundColor: '#E8E8E8',
          marginTop: 20,
          marginBottom: 10,
          padding: 5,
        }}
        onFLipStart={toggleTranslated}>
        <View>
          <Card>
            <SymptomList isTranslated={translated} data={data} />
          </Card>
        </View>
        <View>
          <Card>
            <SymptomList isTranslated={!translated} data={data} />
          </Card>
        </View>
      </FlipCard>
      <View style={styles.container}>
        <Button compact={true} disabled={translated} onPress={toggleTranslated}>
          German
        </Button>
        <View style={styles.separator} />
        <Button
          compact={true}
          disabled={!translated}
          onPress={toggleTranslated}>
          English
        </Button>
      </View>

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
