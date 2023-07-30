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
      screenOptions={({navigation, route}) => ({
        headerLeft: () =>
          route.name === 'HomeScreen' ? (
            <MaterialCommunityIcons
              name="menu"
              size={30}
              marginLeft={10}
              color="purple"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ) : (
            <MaterialCommunityIcons
              name="arrow-left"
              size={30}
              marginLeft={10}
              color="purple"
              onPress={() => {
                navigation.goBack();
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
            unmountOnBlur: true,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};
