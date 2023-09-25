interface DrawerMenuItem {
  title: string;
  name: keyof RootStackParams;
  icon?: string;
  screen: any;
  isShownInDrawer: boolean;
}

interface DrawerContentProps {
  navigation: import('@react-navigation/stack').StackNavigationProp<
    RootStackParams,
    'HomeScreen'
  >;
}
