import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../constants/general';

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  languageType,
  selectedLanguage,
  setLanguage,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.langView}>
      <Text>{t(`initialSettings.${languageType}`)}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={selectedLanguage}
          onValueChange={value => setLanguage(value)}>
          <Picker.Item label={t('select') as string} />
          {LANGUAGES.map((lang: string) => (
            <Picker.Item
              key={lang}
              label={t(`languages.${lang}`) as string}
              value={`${lang}`}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  langView: {
    flex: 1,
    alignItems: 'center',
    width: '75%',
  },
  pickerContainer: {
    marginTop: 10,
    width: '50%',
    borderStyle: 'solid',
    borderRadius: 4,
    borderColor: '#D0D5DD',
    borderWidth: 2,
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
