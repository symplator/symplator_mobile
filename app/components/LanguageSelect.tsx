import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../constants/general';

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  languageType,
  selectedLanguage,
  excludedLanguage,
  alignItems = 'center',
  setLanguage,
}) => {
  const {t} = useTranslation();

  return (
    <View style={{...styles.container, alignItems}}>
      <Text variant="labelLarge">{t(`initialSettings.${languageType}`)}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={selectedLanguage}
          onValueChange={value => setLanguage(value)}>
          <Picker.Item label={t('select') as string} />
          {LANGUAGES.filter(lang => lang !== excludedLanguage).map(
            (lang: string) => (
              <Picker.Item
                key={lang}
                label={t(`languages.${lang}`) as string}
                value={`${lang}`}
              />
            ),
          )}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  pickerContainer: {
    marginTop: 10,
    width: '100%',
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: '#D0D5DD',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  picker: {
    width: '100%',
    fontSize: 20,
  },
  pickerItem: {
    fontSize: 20,
    color: 'red',
  },
});
