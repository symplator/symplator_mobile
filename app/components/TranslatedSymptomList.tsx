import React, {useContext} from 'react';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {FlatList, ListRenderItem, View} from 'react-native';
import {List} from 'react-native-paper';

type SymptomProps = {
  isTranslated: boolean;
  data: any;
};
export const TranslatedSymptomList: React.FC<SymptomProps> = ({
  isTranslated,
  data,
}) => {
  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage, targetLanguage} = userSettingsContext.userSettings;

  const renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <List.Item
        style={{
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'grey',
          marginBottom: 2,
        }}
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
        titleStyle={{marginBottom: 10, fontSize: 17}}
        description={
          isTranslated &&
          item?.translations?.find(t => t.language === currentLanguage)?.name
        }
        descriptionNumberOfLines={10}
        descriptionEllipsizeMode="tail"
        descriptionStyle={{color: 'grey'}}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={data?.symptoms}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};
