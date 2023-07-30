import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import React, {useContext} from 'react';
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

  return (
    <View >
      {data?.symptoms?.map(symptom => (
        <List.Item
          key={symptom._id}
          title={
            symptom?.translations?.find(t =>
              isTranslated
                ? t.language === targetLanguage
                : t.language === currentLanguage,
            )?.name
          }
          titleNumberOfLines={10}
          titleEllipsizeMode="tail"
          description={
            symptom?.translations?.find(t =>
              isTranslated
                ? t.language === targetLanguage
                : t.language === currentLanguage,
            )?.detail
          }
          descriptionNumberOfLines={10}
          descriptionEllipsizeMode="tail"
        />
      ))}
    </View>
  );
};
export const TranslationScreen: React.FC<Props> = ({navigation}) => {
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data} = selectedSymptomListContext as SelectedSymptomListContext;

  const {t} = useTranslation();

  return (
    <>
      <FlipCard flipHorizontal={true} flipVertical={false} perspective={1000}>
        <View>
          <Card style={{backgroundColor: 'white', marginTop: 30}}>
            <SymptomList isTranslated={true} data={data} />
          </Card>
        </View>
        <View>
          <Card style={{backgroundColor: 'white', marginTop: 30}}>
            <SymptomList isTranslated={false} data={data} />
          </Card>
        </View>
      </FlipCard>
      <Button
        style={styles.exportButton}
        dark={true}
        compact={false}
        mode="contained"
        disabled={!data?.symptoms?.length}>
        {t('export')}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  exportButton: {
    borderRadius: 4,
    bottom: 20,
    left: 10,
    width: '100%',
  },
});
