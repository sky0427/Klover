import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import useThemeStore from '@/store/useThemeStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ThemeMode} from '@/types/type';

const ExploreScreen = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View>
      <Text>Explore</Text>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });

export default ExploreScreen;
