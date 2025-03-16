import {colors} from '@/constants/colors';
import {sizes, spacing} from '@/constants/theme';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {getFractionDigitsRating} from '@/utils/ratings';
import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Rating from './Rating';

interface RatingOverallProps {
  rating: number;
  containerStyle?: ViewStyle;
}

const RatingOverall = ({rating, containerStyle}: RatingOverallProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.rating}>{getFractionDigitsRating(rating)}</Text>
      <View>
        <Text style={styles.caption}>Overall Rating</Text>
        <Rating rating={rating} />
      </View>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rating: {
      fontSize: sizes.h1,
      color: colors[theme].PRIMARY,
      marginRight: spacing.s,
    },
    caption: {
      fontSize: sizes.sm,
      color: colors[theme].GRAY_100,
    },
  });

export default RatingOverall;
