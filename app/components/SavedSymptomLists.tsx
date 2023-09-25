import React from 'react';
import {
  List,
  Button,
  Dialog,
  Portal,
  PaperProvider,
  MD3Colors,
  Text,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, StyleSheet, View, FlatList} from 'react-native';
import {LocalRealmContext} from '../context/Realm/RealmContext';
import {SelectedSymptomListSchema} from '../models/SelectedSymptomList';
import {LOCALES} from '../constants/general';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  symptomLists: Realm.Results<SelectedSymptomListSchema>;
  navigation: StackNavigationProp<RootStackParams, 'SavedSymptomListsScreen'>;
};

const {useRealm} = LocalRealmContext;

export const SavedSymptomLists: React.FC<Props> = ({
  symptomLists,
  navigation,
}) => {
  const {t, i18n} = useTranslation();
  const realm = useRealm();
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] =
    React.useState<SelectedSymptomListSchema | null>(null);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const deleteSymptomList = (): void => {
    realm.write(() => {
      realm.delete(selectedItem);
    });

    hideDialog();
  };

  const redirect = (item: SelectedSymptomListSchema) => {
    navigation.navigate('SymptomDetailScreen', {
      data: {symptoms: item.symptoms, tag: item.tag, date: item.date.getTime()},
    });
  };

  return (
    <>
      <PaperProvider>
        <Portal>
          <FlatList
            style={styles.list}
            data={symptomLists}
            renderItem={({item}) => (
              <View style={styles.listItem} key={item._id as unknown as number}>
                <TouchableOpacity
                  style={styles.listItemTxt}
                  onPress={() => {
                    setSelectedItem(item);
                    redirect(item);
                  }}>
                  <Text style={styles.listItemTitle} variant="bodyMedium">
                    {item.tag}
                  </Text>
                  <Text style={styles.listItemDate} variant="bodyMedium">
                    {item.date.toLocaleDateString(LOCALES[i18n.language])}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(item);
                    showDialog();
                  }}>
                  <List.Icon color={MD3Colors.primary60} icon="delete" />
                </TouchableOpacity>
              </View>
            )}
          />
          <Dialog
            style={styles.dialog}
            visible={visible}
            onDismiss={hideDialog}>
            <Dialog.Title>{t('deleteSymptomListDialogTitle')}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                {t('deleteSymptomListDialogContent')}
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={styles.actions}>
              <Button style={styles.actionBtn} onPress={hideDialog}>
                {t('cancel')}
              </Button>
              <Button
                style={styles.actionBtn}
                onPress={() => deleteSymptomList()}>
                {t('delete')}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    maxHeight: '97%',
    paddingHorizontal: 10,
    marginTop: 15,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginBottom: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  listItemTxt: {
    width: '90%',
  },
  listItemTitle: {
    fontWeight: 'bold',
  },
  listItemDate: {
    fontSize: 12,
  },
  listItemDeleteBtn: {},
  dialog: {
    backgroundColor: '#FFFFFF',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    width: '40%',
  },
});
