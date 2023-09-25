import {StackNavigationProp} from '@react-navigation/stack';
import {View, StyleSheet} from 'react-native';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import React, {useContext} from 'react';
import {PaperProvider} from 'react-native-paper';
import {TranslatedSymptomList} from '../components/TranslatedSymptomList';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {createPdf} from '../utils/createPdf';
import {SymptomsPdfModal} from '../components/SymptomsPdfModal';
import {TextToSpeechButton} from '../components/TextToSpeechButton';
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
    const filePath = createPdf(data?.symptoms, targetLanguage, currentLanguage);
    setPdfPath(await filePath);
    setPdfVisible(true);
  };

  return (
    <PaperProvider>
      <View style={styles.main}>
        <TextToSpeechButton data={data} />
        <SymptomsPdfModal
          pdfVisible={pdfVisible}
          onClose={hidePdfModal}
          filePath={pdfPath}
        />
        <TranslatedSymptomList
          isTranslated={true}
          data={data}
          handleExport={handleExport}
          marginTop={20}
          customHeight="82%"
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  main: {
    minHeight: '100%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    flexDirection: 'column',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
