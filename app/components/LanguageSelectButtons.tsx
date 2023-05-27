import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

export const LanguageSelectButtons: React.FC<LanguageSelectButtonsProps> = ({
  languages,
  handleClick,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      {languages.map((lang, index) => (
        <Button
          key={index}
          dark={true}
          compact={false}
          mode="contained"
          style={styles.btn}
          onPress={() => handleClick(lang)}>
          {t(`languages.${lang}`)}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 70,
    color: '#FFFFFF !important',
  },
  btn: {
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    borderRadius: 4,
  },
});
