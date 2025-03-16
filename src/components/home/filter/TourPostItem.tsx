import useThemeStore from '@/store/useThemeStore';
import {TourPostDto} from '@/types';
import {ThemeMode} from '@/types/type';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TourPostItemProps {
  post: TourPostDto;
}

const TourPostItem: React.FC<TourPostItemProps> = ({post}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.card}>
      <Text>TourPostItem</Text>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    card: {
      flex: 1,
    },
  });

export default TourPostItem;
