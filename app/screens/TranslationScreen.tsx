import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet, Share} from 'react-native';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import React, {useContext} from 'react';
import {Button, PaperProvider} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {TranslatedSymptomList} from '../components/TranslatedSymptomList';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {createPdf} from '../utils/createPdf';
import {SymptomsPdfModal} from '../components/SymptomsPdfModal';
import {ExportButton} from '../components/ExportButton';
type Props = {
  navigation: StackNavigationProp<RootStackParams, 'TranslationScreen'>;
};

export const TranslationScreen: React.FC<Props> = () => {
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data} = selectedSymptomListContext as SelectedSymptomListContext;

  const {t} = useTranslation();
  const userSettingsContext = useContext(UserSettingsContext);
  const {targetLanguage, currentLanguage} = userSettingsContext.userSettings;
  const [pdfVisible, setPdfVisible] = React.useState(false);
  const [pdfPath, setPdfPath] = React.useState('');

  const hidePdfModal = () => setPdfVisible(false);

  const textToShareTarget =
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

  const textToShareCurrent =
    t('mySymptoms', {lng: currentLanguage}) +
    ':\n' +
    data?.symptoms
      ?.map(
        symptom =>
          symptom?.translations?.find(
            translation => translation.language === currentLanguage,
          )?.name,
      )
      .join('\n');
  const handleShare = async () => {
    try {
      const options = {
        title: t('mySymptoms'),
        message: `${textToShareTarget} \n ${textToShareCurrent}`,
      };

      await Share.share(options);
    } catch (error) {
      console.log('Error sharing text:', error.message);
    }
  };

  const handleExport = async () => {
    const filePath = createPdf(data?.symptoms, targetLanguage, currentLanguage);
    setPdfPath(await filePath);
    setPdfVisible(true);
  };

  return (
    <PaperProvider>
      <View style={styles.main}>
        <SymptomsPdfModal
          pdfVisible={pdfVisible}
          onClose={hidePdfModal}
          filePath={pdfPath}
        />
        <TranslatedSymptomList isTranslated={true} data={data} />
        <Button
          style={styles.shareButton}
          dark={true}
          compact={false}
          mode="contained"
          disabled={!data?.symptoms?.length}
          onPress={handleShare}
          icon="share-variant-outline">
          {t('share')}
        </Button>
        <ExportButton handleExport={handleExport} data={data} />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    right: 10,
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
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
});
