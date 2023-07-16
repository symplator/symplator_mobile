import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<RootStackParams, 'SettingsScreen'>;
  route: RouteProp<RootStackParams, 'SettingsScreen'>;
};

export const SettingsScreen: React.FC<Props> = () => {
  return (
    <View style={styles.main}>
      <Text>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5F5F5',
    color: '#333333',
    height: '100%',
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    fontFamily: 'Roboto, Open Sans',
    position: 'relative',
  },
});
