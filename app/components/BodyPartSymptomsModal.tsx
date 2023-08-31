import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modal, Text, Button, Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {t} from 'i18next';
import {SymptomSchema} from '../models/Symptom';
import {SelectedSymptomListContext} from '../context/SelectedSymptomList/SelectedSymptomListContext';
import {SyncedRealmContext} from '../context/Realm/RealmContext';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';
import {useTheme} from 'react-native-paper';

interface Props {
  visible: boolean;
  hideModal: () => void;
  selectedBodyPart: string;
  selectedBodyPartId: number;
  redirect: (screen: keyof RootStackParams) => void;
}
const {useQuery} = SyncedRealmContext;

export const BodyPartSymptomsModal: React.FC<Props> = ({
  visible,
  hideModal,
  selectedBodyPart,
  selectedBodyPartId,
  redirect,
}) => {
  const theme = useTheme();
  const symptoms = useQuery(SymptomSchema);
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {data, isLoading, updateData} =
    selectedSymptomListContext as SelectedSymptomListContext;

  const [filteredSymptoms, setFilteredSymptoms] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedSymptomCount, setSelectedSymptomCount] = useState(0);

  const userSettingsContext = useContext(UserSettingsContext);
  const {currentLanguage} = userSettingsContext.userSettings;

  useEffect(() => {
    if (selectedBodyPartId && symptoms) {
      const results = Array.from(
        symptoms.filtered('body_parts=$0', selectedBodyPartId),
      );
      setFilteredSymptoms(results);
    }
  }, [selectedBodyPartId, symptoms]);

  useEffect(() => {
    if (data?.symptoms?.length && !isLoading) {
      setSelectedSymptoms(data.symptoms);
    }
  }, [data, isLoading]);

  useEffect(() => {
    setSelectedSymptomCount(
      selectedSymptoms?.filter(symp =>
        filteredSymptoms?.find(fs => fs._id === symp._id),
      )?.length || 0,
    );
  }, [selectedSymptoms, filteredSymptoms]);

  const isSymptomSelected = id =>
    selectedSymptoms?.find(item => item._id === id);

  const saveSelectedSymptoms = () => {
    updateData({symptoms: selectedSymptoms});
    redirect('HomeScreen');
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.closeIcon} onPress={hideModal}>
        <MaterialCommunityIcons name={'close'} size={30} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.title}>
        <Text variant="titleMedium">
          {t('bodyPartSymptoms', {
            name: t(`bodyParts.${selectedBodyPart}`),
          })}
        </Text>
        <View style={[styles.counter, {backgroundColor: theme.colors.primary}]}>
          <Text style={styles.counterTxt}>{selectedSymptomCount}</Text>
        </View>
      </View>

      <FlatList
        style={styles.list}
        data={filteredSymptoms}
        renderItem={({item}) => (
          <View key={item as unknown as number}>
            <TouchableOpacity
              style={[
                styles.listItem,
                isSymptomSelected(item.id) && styles.checked,
              ]}
              onPress={() => {
                isSymptomSelected(item._id)
                  ? setSelectedSymptoms([
                      ...selectedSymptoms.filter(sym => sym._id !== item._id),
                    ])
                  : setSelectedSymptoms([...selectedSymptoms, item]);
              }}>
              <Checkbox
                status={isSymptomSelected(item._id) ? 'checked' : 'unchecked'}
              />
              <Text style={styles.symptomName}>
                {
                  item?.translations?.find(t => t.language === currentLanguage)
                    ?.name
                }
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button
        style={styles.saveBtn}
        onPress={saveSelectedSymptoms}
        mode="contained">
        {t('save')}
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
  },
  icon: {padding: 5},
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  counter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  counterTxt: {color: '#FFF'},
  list: {
    marginTop: 20,
    marginBottom: 20,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#F5F5F5',
  },
  symptomName: {marginLeft: 10},
  saveBtn: {borderRadius: 4},
});
