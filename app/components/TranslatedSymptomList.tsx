import React, {useContext} from 'react';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {View} from 'react-native';
import {List} from 'react-native-paper';

type symptomProps = {
  isTranslated: boolean;
  data: any;
};
export const TranslatedSymptomList: React.FC<symptomProps> = ({
  isTranslated,
  data,
}) => {
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
          style={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'grey',
            marginBottom:2
          }}
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
          descriptionStyle={{color: 'grey'}}>
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
