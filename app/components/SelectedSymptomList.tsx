import React, {useContext} from 'react';
import {List} from 'react-native-paper';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';

export const SelectedSymptomList: React.FC<SelectedSymptomListProps> = ({
  isTranslated,
  icon,
}) => {
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data} = selectedSymptomListContext as SelectedSymptomListContext;

  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage, targetLanguage} = userSettingsContext.userSettings;
  const {updateData} = selectedSymptomListContext as SelectedSymptomListContext;

  const removeSymptomFromSelectedList = (symptom: Symptom): void => {
    const symptoms = data?.symptoms;
    const newSymptoms = symptoms.filter(item => item !== symptom);
    updateData({symptoms: newSymptoms});
  }

  return (
    <>
      {data?.symptoms.map(symptom => (
        <List.Item
          key={symptom._id}
          title={
            symptom?.translations?.find(t =>
              isTranslated
                ? t.language === targetLanguage
                : t.language === currentLanguage,
            )?.name
          }
          description={
            isTranslated &&
            symptom?.translations?.find(t => t.language === currentLanguage)
              ?.name
          }
          right={() => icon}
          onLongPress={() => removeSymptomFromSelectedList(symptom)}
        />
      ))}
    </>
  );
};

