import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {PaperProvider, Portal, Text} from 'react-native-paper';
import {t} from 'i18next';
import {StackNavigationProp} from '@react-navigation/stack';
// import {HumanBodyPartsImage} from '../components/HumanBodyPartsImage';
import {BodyPartSymptomsModal} from '../components/BodyPartSymptomsModal';

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SymptomImageSearchScreen'>;
};

export const SymptomImageSearchScreen: React.FC<Props> = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [selectedBodyPartId, setSelectedBodyPartId] = useState(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);

  const showModal = ({id, name}) => {
    setVisible(true);
    setSelectedBodyPartId(id);
    setSelectedBodyPart(name);
  };
  const hideModal = () => setVisible(false);

  const redirect = (screen: keyof RootStackParams) => {
    navigation.navigate(screen);
  };

  return (
    <PaperProvider>
      <Portal>
        <Text variant="bodyMedium" style={styles.title}>
          {t('pressBodyPart')}
        </Text>
        {/* <HumanBodyPartsImage onPress={showModal} /> */}
        {/* {visible && ( */}
        <BodyPartSymptomsModal
          visible={visible}
          hideModal={hideModal}
          selectedBodyPart={selectedBodyPart}
          selectedBodyPartId={selectedBodyPartId}
          redirect={redirect}
        />
        {/* )} */}
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 10,
  },
});
