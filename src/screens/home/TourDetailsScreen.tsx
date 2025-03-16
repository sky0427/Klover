import TourDetailsCard from '@/components/home/details/TourDetailsCard';
import TourDetailsCarousel from '@/components/home/details/TourDetailsCarousel';
import CustomIcon from '@/components/shared/CustomIcon';
import ScreenWrapper from '@/components/shared/ScreenWrapper';
import {colors} from '@/constants/colors';
import {homeNavigations} from '@/constants/navigations';
import {sizes, spacing} from '@/constants/theme';
import {useGetDetailTourPost} from '@/hooks/react-query/useTourPostQueries';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef, useState} from 'react';
import {Animated, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type TourDetailScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, typeof homeNavigations.TOUR_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

const TourDetailsScreen: React.FC<TourDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {id} = route.params;

  const [favorite, setFavorite] = useState(false);

  const imageFadeAnim = useRef(new Animated.Value(0)).current;

  const {data: tour, isLoading, isError} = useGetDetailTourPost(id);
  // const slides = [data?.firstImage, ...data?.firstImage];

  const handlePressFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <ScreenWrapper style={styles.container}>
      <Animatable.View
        style={[styles.backButton, {marginTop: insets.top + spacing.l}]}
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
        style={[styles.favoriteButton, {marginTop: insets.top + spacing.l}]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out">
        <CustomIcon
          name={'HeartFillSvg'}
          size={24}
          color={favorite ? colors[theme].DANGER : colors[theme].UNCHANGE_WHITE}
          style={styles.favoriteIcon}
          onPress={handlePressFavorite}
        />
      </Animatable.View>

      <Animated.View style={[StyleSheet.absoluteFillObject, styles.imageBox]}>
        <Image source={{uri: tour?.firstImage}} style={styles.image} />
      </Animated.View>

      <TourDetailsCarousel slides={tour?.firstImage!} id={id} />
      <TourDetailsCard tour={tour!} />
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
      padding: 8,
      borderRadius: sizes.radius,
    },
    favoriteButton: {
      position: 'absolute',
      right: spacing.l,
      zIndex: 1,
    },
    favoriteIcon: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: 8,
      borderRadius: sizes.radius,
    },
  });

export default TourDetailsScreen;
