import {Button} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';
import {createPdf} from 'utils/createPdf';
import {t} from 'i18next';

type Props = {
  data: SelectedSymptomList;
  handleExport: () => {};
};

export const ExportButton: React.FC<Props> = ({data, handleExport}) => {
  return (
    <>
      <Button
        style={styles.exportButton}
        dark={true}
        compact={false}
        mode="contained"
        disabled={!data?.symptoms?.length}
        onPress={handleExport}
        icon="export">
        {t('export')}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  exportButton: {
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
});
