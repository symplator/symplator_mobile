import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {DRAWER_MENU_ITEMS} from '../../constants/DrawerItems';
import {Text, useTheme} from 'react-native-paper';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

const DrawerContent: React.FC<DrawerContentComponentProps> = ({navigation}) => {
  const {t} = useTranslation();
  const theme = useTheme();

  const navigateToScreen = (screen: keyof RootStackParams) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {DRAWER_MENU_ITEMS.map(
        item =>
          item.isShownInDrawer && (
            <TouchableOpacity
              key={item.title}
              style={styles.drawerItem}
              onPress={() => navigateToScreen(item.screen)}>
              <MaterialCommunityIcons
                name={item.icon}
                size={20}
                color={theme.colors.primary}
              />
              <Text style={styles.drawerItemText}>
                {t(`screens.${item.title}`)}
              </Text>
            </TouchableOpacity>
          ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  drawerItem: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default DrawerContent;
