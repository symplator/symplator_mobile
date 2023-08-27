import {FAB} from 'react-native-paper';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {t} from 'i18next';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import Tts from 'react-native-tts';

type Props = {
  data: SelectedSymptomList;
};

export const TextToSpeechButton: React.FC<Props> = ({data}) => {
  
  const userSettingsContext = useContext(UserSettingsContext);
  const {targetLanguage} = userSettingsContext.userSettings;
  
  Tts.setDefaultLanguage(targetLanguage);
  Tts.setDefaultRate(0.5);

  const textToSpeechTarget =
    t('mySymptoms', {lng: targetLanguage}) +
    ':\n' +
    data?.symptoms
      ?.map(
        symptom =>
          symptom?.translations?.find(
            translation => translation.language === targetLanguage,
          )?.name,
      )
      .join('\n');

  const handleTextToSpeech = async () => {
    Tts.getInitStatus().then(() => {
      Tts.speak(textToSpeechTarget);
    });
  }

  return (
    <>
      <FAB icon="bullhorn" style={styles.fab} onPress={handleTextToSpeech} />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
    zIndex: 10,
  },
});
