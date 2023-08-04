import {SymptomListScreen} from '../screens/SymptomListScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {SavedSymptomListsScreen} from '../screens/SavedSymptomListsScreen';
import {TranslationScreen} from '../screens/TranslationScreen';
import {SaveSymptomListScreen} from '../screens/SaveSymptomListScreen';

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
    title: 'saveSymptomList',
    name: 'SaveSymptomListScreen',
    screen: SaveSymptomListScreen,
    isShownInDrawer: false,
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
