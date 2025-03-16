import {spacing} from '@/constants/theme';
import {ReviewDto} from '@/types';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Review from './Review';

interface ReviewsProps {
  reviews: ReviewDto[];
}

const Reviews: React.FC<ReviewsProps> = ({reviews = []}) => {
  return (
    <View style={styles.container}>
      {reviews.map(review => (
        <Review review={review} key={review.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.l,
  },
});

export default Reviews;
