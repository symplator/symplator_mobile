import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from '../screens/InitialSettings/WelcomeScreen';
import {GenderScreen} from '../screens/InitialSettings/GenderScreen';
import {BirthYearScreen} from '../screens/InitialSettings/BirthYearScreen';
import {LanguageScreen} from '../screens/InitialSettings/LanguageScreen';

const Stack = createStackNavigator<InitialSettingsStackParams>();

export const InitialSettingsStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="BirthYearScreen" component={BirthYearScreen} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
    </Stack.Navigator>
  );
};
