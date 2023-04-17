import React, {useMemo} from 'react';
import {useApp} from '@realm/react';
import {Button, Text} from 'react-native';
import {Symptom} from './models/Symptom';
import {SymplatorRealmContext} from './models';

const {useQuery, useRealm} = SymplatorRealmContext;

export const AppSync: React.FC = () => {
  const realm = useRealm();
  const app = useApp();
  const result = useQuery(Symptom);

  const symptoms = useMemo(() => result.sorted('_id'), [result]);

  // todo remove - adds to local realm
  const addSymptom = () => {
    // const translation = new SymptomTranslation(
    //   realm,
    //   'tr',
    //   'Ince hastalik',
    //   '',
    //   '',
    // );
    // console.log('** ', translation);

    const res = realm.write(() => {
      console.log('heree');
      return new Symptom(realm, 'test2', [3], []);
    });

    console.log(res);
  };

  return (
    <>
      <Text>Syncing with app id: {app.id}</Text>
      <Text>Symptoms: {JSON.stringify(symptoms)}</Text>
      <Button onPress={() => addSymptom()} title="Add Symptom" />
    </>
  );
};

// const styles = StyleSheet.create({
//   idText: {
//     color: '#999',
//     paddingHorizontal: 20,
//   },
//   authButton: {
//     ...buttonStyles.button,
//     ...shadows,
//     backgroundColor: colors.purpleDark,
//   },
//   authButtonText: {
//     ...buttonStyles.text,
//   },
// });
