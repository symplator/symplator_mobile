import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import {t} from 'i18next';

interface Props {
  hideTitle?: boolean;
  redirect: (screen: keyof RootStackParams) => void;
}

export const SymptomSearch: React.FC<Props> = ({hideTitle, redirect}) => {
  const theme = useTheme();
  return (
    <>
      <View>
        {!hideTitle && (
          <Text variant="titleMedium" style={styles.title}>
            {t('startSearch')}
          </Text>
        )}

        {hideTitle ? (
          <View style={styles.searchIconContainer}>
            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() => redirect('SymptomImageSearchScreen')}>
              <MaterialCommunityIcons
                name={'human-male'}
                size={40}
                color={theme.colors.primary}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.searchIcon}
              onPress={() => redirect('SymptomTextSearchScreen')}>
              <MaterialCommunityIcons
                name={'text-box-search-outline'}
                size={40}
                color={theme.colors.primary}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.searchBtnContainer}>
            <Button
              mode="contained"
              icon={'human-male'}
              accessibilityLabel="Search by body image"
              accessibilityHint="Search by body image"
              style={styles.btn}
              onPress={() => redirect('SymptomImageSearchScreen')}>
              {t('bodyImage')}
            </Button>
            <Button
              mode="contained"
              icon={'text-box-search-outline'}
              accessibilityLabel="Search by text"
              accessibilityHint="Search by text"
              style={styles.btn}
              onPress={() => redirect('SymptomTextSearchScreen')}>
              {t('text')}
            </Button>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    margin: 30,
  },
  searchIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  searchIcon: {
    borderRadius: 4,
    maxWidth: 55,
    paddingLeft: 4,
  },
  icon: {padding: 5},
  searchBtnContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    borderRadius: 4,
    minWidth: '35%',
  },
});
