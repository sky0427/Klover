import CustomIcon from '@/components/shared/CustomIcon';
import {colors} from '@/constants/colors';
import {sizes, spacing} from '@/constants/theme';
import useThemeStore from '@/store/useThemeStore';
import {DetailTourPostDto, ReviewDto} from '@/types';
import {ThemeMode} from '@/types/type';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import SectionHeader from '../SectionHeader';
import RatingOverall from '../rating/RatingOverall';
import Reviews from '../reviews/Reviews';
import CustomBackground from './CustomBackground';
import CustomHandler from './CustomHandler';
import Divider from './Divider';

export interface DetailTourPostDtoWithReviews extends DetailTourPostDto {
  reviews: ReviewDto[];
}

interface TourDetailsCardProps {
  tour: DetailTourPostDtoWithReviews;
}

const AnimatedDivider = Animated.createAnimatedComponent(Divider);

const TourDetailsCard: React.FC<TourDetailsCardProps> = ({tour}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const animatedIndex = useSharedValue(0);
  const snapPoints = useMemo(() => ['30%', '80%'], []);

  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [colors[theme].WHITE, colors[theme].UNCHANGE_BLACK],
    ),
    marginBottom: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [6, 10],
      Extrapolation.CLAMP,
    ),
  }));

  const locationStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [colors[theme].WHITE, colors[theme].TEXT],
    ),
    fontSize: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [sizes.h3, sizes.h4],
      Extrapolation.CLAMP,
    ),
  }));

  const locationIonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [40, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <BottomSheet
      index={0}
      animatedIndex={animatedIndex}
      snapPoints={snapPoints}
      backgroundComponent={CustomBackground}
      handleComponent={CustomHandler}>
      <Animatable.View
        style={styles.header}
        animation="fadeInUp"
        delay={500}
        easing="ease-in-out"
        duration={400}>
        <Animated.Text style={[styles.title, titleStyle]}>
          {tour?.title}
        </Animated.Text>
        <View style={styles.location}>
          <Animated.Text style={[styles.locationText, locationStyle]}>
            {tour?.addr1}
          </Animated.Text>
          <Animated.View style={locationIonStyle}>
            <CustomIcon
              name="LocationLineSvg"
              size={20}
              color={colors[theme].GRAY_100}
            />
          </Animated.View>
        </View>
      </Animatable.View>
      <AnimatedDivider style={contentStyle} />
      <BottomSheetScrollView
        style={styles.scrollBox}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Animated.View style={contentStyle}>
          <RatingOverall
            rating={tour?.avgRating}
            containerStyle={styles.rating}
          />
          <SectionHeader
            title="Summary"
            containerStyle={styles.sectionHeader}
            textStyle={styles.sectionTitle}
          />
          <View style={styles.summary}>
            <Text style={styles.summaryText}>{tour?.overview}</Text>
          </View>
          <SectionHeader
            title="Reviews"
            containerStyle={styles.sectionHeader}
            textStyle={styles.sectionTitle}
            onPress={() => {}}
          />
          <Reviews reviews={tour?.reviews} />
        </Animated.View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    header: {
      paddingVertical: spacing.l,
      paddingHorizontal: spacing.l,
    },
    title: {
      fontSize: sizes.h2,
      fontWeight: 'bold',
      color: colors[theme].WHITE,
    },
    location: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    locationText: {
      fontSize: sizes.h3,
      color: colors[theme].WHITE,
    },
    scrollBox: {
      marginTop: spacing.s,
      marginBottom: spacing.m,
    },
    sectionHeader: {
      marginTop: spacing.m,
    },
    sectionTitle: {
      color: colors[theme].GRAY_100,
      fontWeight: 'normal',
    },
    summary: {
      marginHorizontal: spacing.l,
    },
    summaryText: {
      color: colors[theme].BLACK,
    },
    rating: {
      marginHorizontal: spacing.l,
    },
  });

export default TourDetailsCard;
