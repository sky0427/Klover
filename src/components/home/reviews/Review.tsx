import {colors} from '@/constants/colors';
import {sizes, spacing} from '@/constants/theme';
import useGetMemberInfo from '@/hooks/react-query/useMemberQueries';
import useThemeStore from '@/store/useThemeStore';
import {ReviewDto} from '@/types';
import {ThemeMode} from '@/types/type';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Divider from '../details/Divider';
import Rating from '../rating/Rating';

export interface ReviewProps {
  review: ReviewDto;
}

const Review: React.FC<ReviewProps> = ({review}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const {data} = useGetMemberInfo(review.memberId);

  return (
    <>
      <Divider enabledSpacing={false} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{uri: data?.memberDto.profileUrl}}
          />
          <View style={styles.userBox}>
            <Text style={styles.user}>{review.nickname}</Text>
            <Text style={styles.date}>{review.createDate}</Text>
          </View>
          <Rating rating={review.rating} showLabelTop />
        </View>
        <Text style={styles.text}>{review.content}</Text>
      </View>
    </>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      marginVertical: spacing.l,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.s,
    },
    avatar: {
      height: 30,
      width: 30,
      resizeMode: 'cover',
      borderRadius: sizes.radius,
      marginRight: spacing.s,
    },
    userBox: {
      flex: 1,
      marginRight: spacing.s,
    },
    user: {
      color: colors[theme].PRIMARY,
      fontSize: sizes.body,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    date: {
      fontSize: sizes.sm,
      color: colors[theme].GRAY_100,
    },
    text: {
      color: colors[theme].TEXT,
    },
  });

export default Review;
