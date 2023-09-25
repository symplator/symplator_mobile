import {Button} from 'react-native-paper';
import React, {useContext} from 'react';
import {Share, StyleSheet} from 'react-native';
import {t} from 'i18next';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';

type Props = {
  data: SelectedSymptomList;
};

export const ShareButton: React.FC<Props> = ({data}) => {
  const userSettingsContext = useContext(UserSettingsContext);
  const {targetLanguage, currentLanguage} = userSettingsContext.userSettings;

  const textToShareTarget =
    t('mySymptoms', {lng: targetLanguage}) +
    ':\n' +
    '----------------------------\n' +
    data?.symptoms
      ?.map(
        (symptom, index) =>
          index +
          1 +
          '. ' +
          symptom?.translations?.find(
            translation => translation.language === targetLanguage,
          )?.name +
          '\n(' +
          symptom?.translations?.find(
            translation => translation.language === currentLanguage,
          )?.name +
          ')\n',
      )
      .join('\n');

  const handleShare = async () => {
    try {
      const options = {
        title: t('mySymptoms'),
        message: `${textToShareTarget}`,
      };

      await Share.share(options);
    } catch (error) {
      console.log('Error sharing text:', error.message);
    }
  };

  return (
    <>
      <Button
        style={styles.btn}
        dark={true}
        compact={false}
        mode="contained"
        disabled={!data?.symptoms?.length}
        onPress={handleShare}
        icon="share-variant-outline">
        {t('share')}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '40%',
    borderRadius: 4,
  },
});
