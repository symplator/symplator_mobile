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
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {LocalRealmContext} from '../context/Realm/RealmContext';
import {SelectedSymptomListSchema} from '../models/SelectedSymptomList';
import {LOCALES} from '../constants/general';

type Props = {
  symptomLists: Realm.Results<SelectedSymptomListSchema>;
};

const {useRealm} = LocalRealmContext;

export const SavedSymptomLists: React.FC<Props> = ({symptomLists}) => {
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

  return (
    <>
      <PaperProvider>
        <Portal>
          {symptomLists?.map(item => (
            <View style={styles.listItem} key={item._id as unknown as number}>
              <View style={styles.listItemTxt}>
                <Text style={styles.listItemTitle} variant="bodyMedium">
                  {item.tag}
                </Text>
                <Text style={styles.listItemDate} variant="bodyMedium">
                  {item.date.toLocaleDateString(LOCALES[i18n.language])}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  showDialog();
                }}>
                <List.Icon color={MD3Colors.primary60} icon="delete" />
              </TouchableOpacity>
            </View>
          ))}
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
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 0,
  },
  listItemTxt: {},
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
