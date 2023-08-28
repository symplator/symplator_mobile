import React, {useContext, useState, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DatePickerModal} from 'react-native-paper-dates';
import {SelectedSymptomListContext} from './../context/SelectedSymptomList/SelectedSymptomListContext';
import {SelectedSymptomList} from '../components/SelectedSymptomList';
import {LOCALES} from '../constants/general';

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SymptomListScreen'>;
};

export const SaveSymptomListScreen: React.FC<Props> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const theme = useTheme();
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data, updateData, saveData} =
    selectedSymptomListContext as SelectedSymptomListContext;

  const saveAndRedirect = async () => {
    await updateData({...data, tag, date});
    await saveData();
    navigation.navigate('SavedSymptomListsScreen');
  };

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );

  return (
    <View style={styles.main}>
      <View>
        <TextInput
          style={styles.txt}
          label="Etiket"
          value={tag}
          mode="outlined"
          autoFocus={true}
          placeholder={t('mySymptoms')}
          onChangeText={text => setTag(text)}
        />
        <TextInput
          style={styles.dateTxt}
          label="Tarih"
          value={date.toLocaleDateString(LOCALES[i18n.language])}
          mode="outlined"
          onChangeText={text => setTag(text)}
        />
        <TouchableOpacity
          style={styles.datePickerIcon}
          onPress={() => setOpen(true)}>
          <MaterialCommunityIcons
            size={30}
            color={theme.colors.primary}
            name="calendar"
          />
        </TouchableOpacity>
        <DatePickerModal
          locale={i18n.language}
          mode="single"
          visible={open}
          onDismiss={onDismiss}
          date={date}
          onConfirm={onConfirm}
        />
        <SelectedSymptomList showTitle={true} />
      </View>
      <Button
        style={styles.saveBtn}
        dark={true}
        compact={false}
        mode="contained"
        onPress={saveAndRedirect}>
        {t('save')}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    color: '#333333',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
    padding: 10,
  },
  txt: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  dateTxt: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    position: 'relative',
  },
  datePickerIcon: {
    position: 'absolute',
    right: 20,
    top: 85,
  },
  saveBtn: {
    borderRadius: 4,
    position: 'absolute',
    bottom: 20,
    left: 10,
    width: '100%',
  },
});
