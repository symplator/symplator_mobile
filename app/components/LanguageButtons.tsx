import React from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

export const LanguageButtons: React.FC<LanguageButtonsProps> = ({
  languages,
  handleClick,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text variant="titleSmall">Select application language:</Text>
      <View style={styles.btnContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginHorizontal: 20,
  },
  btnContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#FFFFFF !important',
  },
  btn: {
    color: '#FFFFFF',
    borderRadius: 4,
  },
});
