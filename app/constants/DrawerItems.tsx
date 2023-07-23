import {SymptomListScreen} from '../screens/SymptomListScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {SavedSymptomListsScreen} from '../screens/SavedSymptomListsScreen';
import {TranslationScreen} from '../screens/TranslationScreen';

export const DRAWER_MENU_ITEMS: DrawerMenuItem[] = [
  {
    title: 'home',
    name: 'HomeScreen',
    icon: 'home',
    screen: HomeScreen,
    isShownInDrawer: true,
  },
  {
    title: 'mySymptomLists',
    name: 'SavedSymptomListsScreen',
    icon: 'format-list-bulleted-square',
    screen: SavedSymptomListsScreen,
    isShownInDrawer: true,
  },
  {
    title: 'settings',
    name: 'SettingsScreen',
    icon: 'cog',
    screen: SettingsScreen,
    isShownInDrawer: true,
  },
  {
    title: 'mySymptoms',
    name: 'SymptomListScreen',
    icon: 'format-list-bulleted',
    screen: SymptomListScreen,
    isShownInDrawer: false,
  },
  {
    title: 'translate',
    name: 'TranslationScreen',
    icon: 'format-list-bulleted',
    screen: TranslationScreen,
    isShownInDrawer: false,
  },
];
