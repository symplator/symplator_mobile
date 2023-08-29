import React, {useContext, useState} from 'react';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import {ShareButton} from './ShareButton';
import {ExportButton} from './ExportButton';
import {t} from 'i18next';

type SymptomProps = {
  isTranslated?: boolean;
  data: any;
  handleExport?: () => void;
  customHeight?: string;
  showTranslateBtn?: boolean;
  marginTop?: number;
};

// todo move pdf export to this component
export const TranslatedSymptomList: React.FC<SymptomProps> = ({
  isTranslated,
  data,
  handleExport,
  customHeight,
  showTranslateBtn,
  marginTop,
}) => {
  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage, targetLanguage} = userSettingsContext.userSettings;
  const [showTranslated, setShowTranslated] = useState<boolean>(!!isTranslated);

  const renderItem: ListRenderItem<any> = ({item}) => {
    return (
      <List.Item
        style={styles.listItem}
        key={item._id}
        title={
          item?.translations?.find(t =>
            showTranslated
              ? t.language === targetLanguage
              : t.language === currentLanguage,
          )?.name
        }
        titleNumberOfLines={10}
        titleEllipsizeMode="tail"
        titleStyle={styles.listTitle}
        description={
          showTranslated &&
          item?.translations?.find(t => t.language === currentLanguage)?.name
        }
        descriptionNumberOfLines={10}
        descriptionEllipsizeMode="tail"
        descriptionStyle={styles.description}
      />
    );
  };

  return (
    <View>
      {showTranslateBtn && (
        <Button
          onPress={() => setShowTranslated(!showTranslated)}
          style={styles.showTranslatedButton}>
          {showTranslated ? t('showOriginal') : t('showTranslated')}
        </Button>
      )}
      <FlatList
        style={[
          styles.list,
          customHeight && {height: customHeight, minHeight: customHeight},
          marginTop && {marginTop: marginTop},
        ]}
        data={data?.symptoms}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
      />
      <View style={styles.btnContainer}>
        <ShareButton data={data} />
        <ExportButton handleExport={handleExport} data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    height: '85%',
    minHeight: '85%',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
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
  listTitle: {marginBottom: 10, fontSize: 17},
  description: {color: 'grey'},
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  showTranslatedButton: {
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
});
