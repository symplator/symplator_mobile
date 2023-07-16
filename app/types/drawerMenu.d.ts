interface DrawerMenuItem {
  title: string;
  name: keyof RootStackParams;
  icon?: string;
  screen: any;
  isShownInDrawer: boolean;
}

interface DrawerContentProps {
  navigation: any; // Use the correct type for navigation from your navigation library
}
