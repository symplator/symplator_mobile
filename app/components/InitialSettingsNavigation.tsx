import React, {useContext, useEffect, useState} from 'react';
import {IconButton} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {UserSettingsContext} from '../context/UserSettings/UserSettingsContext';

export const InitialSettingsNavigation: React.FC<
  InitialSettingsNavigationProps
> = ({previousScreen, nextScreen, setting, redirect}) => {
  const userSettingsContext = useContext(UserSettingsContext);
  const {updateData} = userSettingsContext as UserSettingsContext;
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setDisabled(!Object.values(setting)?.every(s => s));
  }, [setting]);

  const saveAndRedirect = (
    screen: keyof InitialSettingsStackParams | 'HomeScreen',
  ) => {
    updateData(setting);
    if (screen !== 'HomeScreen') {
      redirect(screen);
    }
  };

  return (
    <View style={styles.navView}>
      {previousScreen && (
        <IconButton
          style={styles.previousBtn}
          icon="arrow-left"
          onPress={() => saveAndRedirect(previousScreen)}
        />
      )}
      {nextScreen && (
        <IconButton
          style={styles.nextBtn}
          disabled={disabled}
          icon="arrow-right"
          onPress={() => saveAndRedirect(nextScreen)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navView: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
  },
  previousBtn: {
    position: 'absolute',
    bottom: 5,
    left: 20,
  },
  nextBtn: {
    position: 'absolute',
    bottom: 5,
    right: 20,
  },
});
