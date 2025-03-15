import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import * as Animatable from 'react-native-animatable';
import CustomIcon from '@/components/shared/CustomIcon';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import {homeNavigations} from '@/constants/navigations';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {sizes, spacing} from '@/constants/theme';
import {colors} from '@/constants/colors';

type TourDetailScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, typeof homeNavigations.TOUR_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

const TourDetailsScreen = ({route, navigation}: TourDetailScreenProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  // const {id} = route.params;
  // const slides = [tour.image, ...tour.gallery];

  return (
    <ScreenWrapper style={styles.container}>
      <Animatable.View
        style={[styles.backButton]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out">
        <CustomIcon
          name="LeftFillSvg"
          size={24}
          color={colors[theme].UNCHANGE_WHITE}
          style={styles.backIcon}
          onPress={navigation.goBack}
        />
      </Animatable.View>
      <Animatable.View
        style={[styles.favoriteButton]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out">
        <CustomIcon
          name="HeartFillSvg"
          size={20}
          color={colors[theme].UNCHANGE_WHITE}
          onPress={() => {}}
        />
      </Animatable.View>
    </ScreenWrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBox: {
      borderRadius: sizes.radius,
      overflow: 'hidden',
    },
    image: {
      width: sizes.width,
      height: sizes.height,
      resizeMode: 'cover',
    },
    backButton: {
      position: 'absolute',
      left: spacing.l,
      zIndex: 1,
    },
    backIcon: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: 4,
      borderRadius: sizes.radius,
    },
    favoriteButton: {
      position: 'absolute',
      right: spacing.l,
      zIndex: 1,
    },
  });

export default TourDetailsScreen;
