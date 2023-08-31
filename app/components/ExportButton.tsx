import {Button} from 'react-native-paper';
import React from 'react';
import {StyleSheet} from 'react-native';
import {t} from 'i18next';

type Props = {
  data: SelectedSymptomList
  handleExport: () => void;
};

export const ExportButton: React.FC<Props> = ({data, handleExport}) => {
  return (
    <>
      <Button
        style={styles.btn}
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
  btn: {
    width: '40%',
    borderRadius: 4,
  },
});
