import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet, Share} from 'react-native';
import React, {useContext} from 'react';
import {TranslatedSymptomList} from '../components/TranslatedSymptomList';
import {Button, PaperProvider, Text} from 'react-native-paper';
import {ExportButton} from '../components/ExportButton';
import {createPdf} from '../utils/createPdf';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {SymptomsPdfModal} from '../components/SymptomsPdfModal';
import {t} from 'i18next';
import {ShareButton} from '../components/ShareButton';
type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SymptomDetailScreen'>;
  route: RouteProp<RootStackParams, 'SymptomDetailScreen'>;
};

export const SymptomDetailScreen: React.FC<Props> = ({route}) => {
  const savedSymptom = route.params?.data;
  const [showTranslated, setShowTranslated] = React.useState<boolean>(false);
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
        <SymptomsPdfModal
          pdfVisible={pdfVisible}
          onClose={hidePdfModal}
          filePath={pdfPath}
        />
        <Text variant="titleMedium" style={styles.tagText}>
          {savedSymptom.tag}
        </Text>
        <Text variant="titleMedium" style={styles.tagText}>
          {new Date(savedSymptom.date).toLocaleDateString()}
        </Text>
        <TranslatedSymptomList
          isTranslated={showTranslated}
          data={savedSymptom}
        />
        <Button
          onPress={() => setShowTranslated(!showTranslated)}
          style={styles.showTranslatedButton}>
          {showTranslated ? t('showOriginal') : t('showTranslated')}
        </Button>
        <ExportButton handleExport={handleExport} data={savedSymptom} />
        <ShareButton data={savedSymptom} />
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
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
    padding: 10,
  },
  tagText: {
    padding: 10,
  },

  showTranslatedButton: {
    marginTop: 15,
  }
});
