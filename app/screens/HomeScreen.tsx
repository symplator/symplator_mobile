import React, {useContext, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {SelectedSymptomListContext} from './../context/SelectedSymptomList/SelectedSymptomListContext';
import {SyncedRealmContext} from '../context/SymplatorRealm/SyncedRealmContext';
import {SymptomSchema} from './../models/Symptom';

const {useQuery} = SyncedRealmContext;

// todo test component to be adjusted
export const HomeScreen = () => {
  const selectedSymptomListContext = useContext(SelectedSymptomListContext);
  const {updateData, saveData} =
    selectedSymptomListContext as SelectedSymptomListContext;
  const result = useQuery(SymptomSchema);
  const symptoms = useMemo(() => result.sorted('_id'), [result]);

  const handleSave = async () => {
    updateData({symptoms});
    saveData();
  };

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.header}>Save Selected Symptoms</Text>
        <View style={styles.genderBtnView} />
        <Button
          dark={true}
          compact={false}
          mode="contained"
          onPress={() => handleSave()}>
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#F5F5F5',
    color: '#333333',
    borderColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 90,
  },
  genderBtnView: {
    marginTop: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  genderBtn: {
    borderRadius: 10,
  },
  selectedGenderBtn: {
    backgroundColor: '#E0E0E0',
  },
});
