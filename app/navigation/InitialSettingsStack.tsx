import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from '../screens/InitialSettings/WelcomeScreen';
import {GenderScreen} from '../screens/InitialSettings/GenderScreen';
import {AgeScreen} from '../screens/InitialSettings/AgeScreen';
import {LanguageScreen} from '../screens/InitialSettings/LanguageScreen';

const Stack = createStackNavigator<InitialSettingsStackParamList>();

export const InitialSettingsStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="AgeScreen" component={AgeScreen} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
    </Stack.Navigator>
  );
};
