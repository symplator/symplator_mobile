import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DRAWER_MENU_ITEMS} from '../../constants/DrawerItems';

const DrawerContent: React.FC<DrawerContentProps> = ({navigation}) => {
  const navigateToScreen = (screen: string) => {
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
                color="purple"
              />
              <Text style={styles.drawerItemText}>{item.title}</Text>
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
