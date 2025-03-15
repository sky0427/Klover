import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TourPostDto} from '@/types';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {spacing} from '@/constants/theme';

interface SearchCardProps {
  item: TourPostDto[];
  index: number;
}

const SearchCard = ({item, index}: SearchCardProps) => {
  const navigation = useNavigation();
  const even = index % 2 === 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index < 6 ? index * 80 : 0)}
      style={{
        paddingTop: index === 1 ? spacing.l : 0,
        paddingLeft: !even ? spacing.l / 2 : 0,
        paddingRight: even ? spacing.l / 2 : 0,
        paddingBottom: spacing.l,
      }}></Animated.View>
  );
};

export default SearchCard;
