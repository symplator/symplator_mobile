import React, {useCallback, useContext} from 'react';
import {List, MD3Colors} from 'react-native-paper';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {useTranslation} from 'react-i18next';
import {ListRenderItem, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

export const SelectedSymptomList: React.FC<SelectedSymptomListProps> = ({
  isTranslated,
  showTitle,
}) => {
  const {t} = useTranslation();
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data, updateData} =
    selectedSymptomListContext as SelectedSymptomListContext;

  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage, targetLanguage} = userSettingsContext.userSettings;

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
    <FlatList
      style={{height: '70%'}}
      data={data.symptoms}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
    />
  );
};

// {showTitle && (
//   <List.Subheader style={{fontSize: 16, fontWeight: 'bold'}}>
//     {t('mySymptoms')}
//   </List.Subheader>
// )}