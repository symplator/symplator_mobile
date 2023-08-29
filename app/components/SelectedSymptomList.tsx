import React, {useCallback, useContext, useEffect} from 'react';
import {Button, List, MD3Colors, Text} from 'react-native-paper';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {useTranslation} from 'react-i18next';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';

export const SelectedSymptomList: React.FC<SelectedSymptomListProps> = ({
  isTranslated,
  redirect,
  hideButtons,
  customHeight,
}) => {
  const {t} = useTranslation();
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data, updateData} =
    selectedSymptomListContext as SelectedSymptomListContext;

  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage, targetLanguage} = userSettingsContext.userSettings;
  const [hasSymptoms, setHasSymptoms] = React.useState(false);

  useEffect(() => {
    if (data?.symptoms?.length) {
      setHasSymptoms(true);
    } else {
      setHasSymptoms(false);
    }
  }, [data?.symptoms?.length]);

  const removeSymptomFromSelectedList = async (
    symptom: Symptom,
  ): Promise<void> => {
    const symptoms = data?.symptoms;
    const filteredSymptoms = symptoms.filter(item => item !== symptom);
    await updateData({...data, symptoms: filteredSymptoms});
  };

  const Icon = useCallback(
    () => <List.Icon color={MD3Colors.primary60} icon="close" />,
    [],
  );

  const renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <List.Item
        key={item._id}
        title={
          item?.translations?.find(t =>
            isTranslated
              ? t.language === targetLanguage
              : t.language === currentLanguage,
          )?.name
        }
        style={styles.listItem}
        titleNumberOfLines={10}
        titleEllipsizeMode="tail"
        description={
          isTranslated &&
          item?.translations?.find(t => t.language === currentLanguage)?.name
        }
        descriptionNumberOfLines={10}
        descriptionEllipsizeMode="tail"
        right={Icon}
        onLongPress={() => removeSymptomFromSelectedList(item)}
      />
    );
  };

  return (
    <View style={[styles.main, customHeight && {height: customHeight}]}>
      {hasSymptoms && (
        <Text variant="titleMedium" style={styles.title}>
          {t('mySymptoms')}
        </Text>
      )}
      {hasSymptoms ? (
        <>
          <FlatList
            data={data?.symptoms}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
          />
          {!hideButtons && (
            <View style={styles.btnContainer}>
              <Button
                style={styles.btn}
                icon="content-save"
                dark={true}
                compact={false}
                mode="contained"
                disabled={!data?.symptoms?.length}
                onPress={() => redirect('SaveSymptomListScreen')}>
                {t('save')}
              </Button>
              <Button
                style={styles.btn}
                icon="translate"
                dark={true}
                compact={false}
                mode="contained"
                disabled={!data?.symptoms?.length}
                onPress={() => redirect('TranslationScreen')}>
                {t('translate')}
              </Button>
            </View>
          )}
        </>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '90%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
    paddingHorizontal: 10,
  },
  title: {
    marginLeft: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  listItem: {
    backgroundColor: 'white',
    marginBottom: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    width: '40%',
    borderRadius: 4,
  },
});
