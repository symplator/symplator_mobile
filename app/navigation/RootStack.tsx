import React, {useCallback} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTranslation} from 'react-i18next';
import DrawerContent from '../components/DrawerMenu/DrawerMenuContent';
import {DRAWER_MENU_ITEMS} from '../constants/DrawerItems';

const Drawer = createDrawerNavigator<RootStackParams>();

export const RootStackNavigator: React.FC = () => {
  const {t} = useTranslation();
  const DrawerContentComponent = useCallback(
    (props: DrawerContentProps) => <DrawerContent {...props} />,
    [],
  );

  return (
    <Drawer.Navigator
      drawerContent={DrawerContentComponent}
      screenOptions={({navigation}) => ({
        headerLeft: () => (
          <MaterialCommunityIcons
            name="menu"
            size={30}
            color="purple"
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
      })}
      initialRouteName="HomeScreen">
      {DRAWER_MENU_ITEMS.map(item => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.screen}
          options={{
            title: t(`screens.${item.title}`),
            headerTitleAlign: 'center',
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};
