import React, {useContext, useState} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  RadioButton,
  ActivityIndicator,
} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {LanguageSelect} from '../components/LanguageSelect';
import {Gender} from '../constants/general';

interface SettingsFormProps {
  redirect: () => void;
}

const Form: React.FC<SettingsFormProps> = ({redirect}) => {
  const userSettingsContext = useContext(UserSettingsContext);
  const {userSettings, updateData} = userSettingsContext;
  const {gender, birthYear, currentLanguage, targetLanguage} = userSettings;
  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation();

  const {control, handleSubmit} = useForm<UserSettings>({
    mode: 'onChange',
  });

  const handleAfterSubmit = () => {
    setIsLoading(false);
    redirect();
  };

  const submit = async (data: UserSettings) => {
    setIsLoading(true);
    await updateData(data);
    Alert.alert(
      ' ',
      t('initialSettings.successSaveSettings', {lng: data.currentLanguage}),
      [
        {
          text: 'OK',
          onPress: handleAfterSubmit,
        },
      ],
      {
        cancelable: true,
        onDismiss: handleAfterSubmit,
      },
    );
  };

  const onInvalid = errors => console.info('+++ ', errors);
  return (
    <>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      )}

      <View style={styles.container}>
        <ScrollView style={styles.containerScroll}>
          <Controller
            control={control}
            name="targetLanguage"
            defaultValue={targetLanguage}
            render={({field}) => (
              <LanguageSelect
                languageType="targetLanguage"
                selectedLanguage={field.value}
                setLanguage={value => field.onChange(value)}
                alignItems="flex-start"
              />
            )}
          />

          <Controller
            control={control}
            name="currentLanguage"
            defaultValue={currentLanguage}
            render={({field}) => (
              <LanguageSelect
                languageType="currentLanguage"
                selectedLanguage={field.value}
                setLanguage={value => field.onChange(value)}
                alignItems="flex-start"
              />
            )}
          />

          <Controller
            control={control}
            name="birthYear"
            defaultValue={birthYear}
            render={({field}) => (
              <>
                <Text variant="labelLarge">
                  {t('initialSettings.birthYear')}
                </Text>
                <TextInput
                  style={styles.input}
                  outlineStyle={styles.inputOutline}
                  onBlur={field.onBlur}
                  mode="outlined"
                  value={field.value.toString()}
                  keyboardType="number-pad"
                  onChangeText={value => field.onChange(value)}
                  maxLength={4}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name="gender"
            defaultValue={gender}
            render={({field}) => (
              <>
                <Text variant="labelLarge">
                  {t('initialSettings.bodyImage')}
                </Text>
                <View style={styles.containerGender}>
                  <View style={styles.genderItem}>
                    <Text>{t('initialSettings.woman')}</Text>
                    <RadioButton
                      value={Gender.Woman}
                      status={
                        field.value === Gender.Woman ? 'checked' : 'unchecked'
                      }
                      onPress={() => field.onChange(Gender.Woman)}
                    />
                  </View>
                  <View style={styles.genderItem}>
                    <Text>{t('initialSettings.man')}</Text>
                    <RadioButton
                      value={Gender.Man}
                      status={
                        field.value === Gender.Man ? 'checked' : 'unchecked'
                      }
                      onPress={() => field.onChange(Gender.Man)}
                    />
                  </View>
                </View>
              </>
            )}
          />
        </ScrollView>
        <Button
          style={styles.saveBtn}
          mode="contained"
          onPress={handleSubmit(submit, onInvalid)}>
          {t('save')}
        </Button>
      </View>
    </>
  );
};

export default Form;

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.5)',
    zIndex: 100,
  },
  container: {
    padding: '5%',
    paddingTop: 40,
    height: '100%',
    color: '#333333',
    position: 'relative',
  },
  containerScroll: {
    height: '100%',
  },
  containerGender: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginTop: 10,
  },
  genderItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  input: {
    marginVertical: 5,
    marginBottom: 20,
    borderColor: 'red !important',
  },
  inputOutline: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#D0D5DD',
  },
  saveBtn: {
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    marginLeft: '6%',
    width: '100%',
  },
});
