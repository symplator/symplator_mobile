import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {TranslatedSymptomList} from '../components/TranslatedSymptomList';
import {PaperProvider, Text} from 'react-native-paper';
import {createPdf} from '../utils/createPdf';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {SymptomsPdfModal} from '../components/SymptomsPdfModal';
import {t} from 'i18next';
import {TextToSpeechButton} from '../components/TextToSpeechButton';
type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SymptomDetailScreen'>;
  route: RouteProp<RootStackParams, 'SymptomDetailScreen'>;
};

export const SymptomDetailScreen: React.FC<Props> = ({route}) => {
  const savedSymptom = route.params?.data;
  const [pdfVisible, setPdfVisible] = React.useState(false);
  const [pdfPath, setPdfPath] = React.useState('');
  const userSettingsContext = useContext(UserSettingsContext);
  const {targetLanguage, currentLanguage} = userSettingsContext.userSettings;

  const handleExport = async () => {
    const filePath = createPdf(
      savedSymptom?.symptoms,
      targetLanguage,
      currentLanguage,
    );
    setPdfPath(await filePath);
    setPdfVisible(true);
  };

  const hidePdfModal = () => setPdfVisible(false);

  return (
    <PaperProvider>
      <View style={styles.main}>
        <TextToSpeechButton size="small" data={savedSymptom} />
        <SymptomsPdfModal
          pdfVisible={pdfVisible}
          onClose={hidePdfModal}
          filePath={pdfPath}
        />
        <Text variant="titleMedium" style={styles.tagText}>
          {t('listTitle')}: {savedSymptom.tag}
        </Text>
        <Text variant="titleMedium" style={styles.tagText}>
          {t('date')}: {new Date(savedSymptom.date).toLocaleDateString()}
        </Text>
        <TranslatedSymptomList
          isTranslated={false}
          showTranslateBtn={true}
          data={savedSymptom}
          customHeight="70%"
          handleExport={handleExport}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
    padding: 10,
  },
  tagText: {
    paddingLeft: 10,
  },
});
