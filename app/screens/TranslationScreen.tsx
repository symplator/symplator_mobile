import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import React, {useContext} from 'react';
import {PaperProvider} from 'react-native-paper';
import {TranslatedSymptomList} from '../components/TranslatedSymptomList';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {createPdf} from '../utils/createPdf';
import {SymptomsPdfModal} from '../components/SymptomsPdfModal';
import {ExportButton} from '../components/ExportButton';
import {ShareButton} from '../components/ShareButton';
import Tts from 'react-native-tts';
type Props = {
  navigation: StackNavigationProp<RootStackParams, 'TranslationScreen'>;
};

export const TranslationScreen: React.FC<Props> = () => {
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data} = selectedSymptomListContext as SelectedSymptomListContext;
 
  const userSettingsContext = useContext(UserSettingsContext);
  const {targetLanguage, currentLanguage} = userSettingsContext.userSettings;
  const [pdfVisible, setPdfVisible] = React.useState(false);
  const [pdfPath, setPdfPath] = React.useState('');

  const hidePdfModal = () => setPdfVisible(false);

  const handleExport = async () => {
    Tts.getInitStatus().then(() => {
      Tts.speak('Hello, world!');
    });
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
        <ShareButton data={data} />
        <ExportButton handleExport={handleExport} data={data} />
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
