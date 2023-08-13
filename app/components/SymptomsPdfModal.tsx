import * as React from 'react';
import {Modal, Portal, Text, Button, PaperProvider} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import {StyleSheet} from 'react-native';

type pdfProps = {
  pdfVisible: boolean;
  filePath: string;
};

export const SymptomsPdfModal: React.FC<pdfProps> = ({
  pdfVisible,
  filePath,
}) => {
  const [visible, setVisible] = React.useState(pdfVisible);

  const hideModal = () => setVisible(false);

  
  const source = {uri: filePath};
  console.log(`source : ${source.uri}`);
  return (
    <Portal>
      <Modal
        visible={pdfVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.error(`Error: ${error}`);
          }}
          style={styles.pdf}
        />
        <Button mode="outlined" onPress={handleDownload} style={styles.downloadButton}>
        Download PDF
      </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%', // Set the width to 100% to fill the container
  },
  downloadButton: {
    marginTop: 10,
  },
});
