import {SymptomListScreen} from '../screens/SymptomListScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {SettingsScreen} from '../screens/SettingsScreen';

export const DRAWER_MENU_ITEMS: DrawerMenuItem[] = [
  {
    title: 'Home',
    name: 'HomeScreen',
    icon: 'home',
    screen: HomeScreen,
    isShownInDrawer: true,
  },
  {
    title: 'Settings',
    name: 'SettingsScreen',
    icon: 'cog',
    screen: SettingsScreen,
    isShownInDrawer: true,
  },
  {
    title: 'My Symptoms',
    name: 'SymptomListScreen',
    icon: 'cog',
    screen: SymptomListScreen,
    isShownInDrawer: false,
  },
];
