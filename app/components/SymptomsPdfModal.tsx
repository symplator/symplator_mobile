import * as React from 'react';
import {Modal, Portal, Button} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import {StyleSheet} from 'react-native';
import {useEffect} from 'react';

type pdfProps = {
  pdfVisible: boolean;
  filePath: string;
  onClose: any;
};

export const SymptomsPdfModal: React.FC<pdfProps> = ({
  pdfVisible,
  filePath,
  onClose,
}) => {
  const source = {uri: filePath};

  console.log(`pdf model rendered with : ${pdfVisible} ${filePath}`);
  console.log(`pdfVisible : ${pdfVisible}`);
  return (
    <Portal>
      <Modal
        visible={pdfVisible}
        onDismiss={onClose}
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
        <Button mode="contained" onPress={onClose} style={styles.closeButton}>
          Close
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
    backgroundColor: 'white',
    margin: 10,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  closeButton: {
    marginVertical: 10,
    borderRadius: 4,
  },
});
