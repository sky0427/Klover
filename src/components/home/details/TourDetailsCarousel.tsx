import CarouselIndicators from '@/components/shared/CarouselIndicators';
import {sizes} from '@/constants/theme';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React, {useRef} from 'react';
import {Animated, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

interface TourDetailsCarouselProps {
  slides: string | string[];
  id: number;
}

const TourDetailsCarousel: React.FC<TourDetailsCarouselProps> = ({
  slides,
  id,
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const scrollAnimated = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;

  const isSlidesArray = Array.isArray(slides);

  const animatedImage = useSharedValue(0);
  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedImage.value,
    };
  });

  return (
    <>
      <Animated.FlatList
        data={slides}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollAnimated}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item: image, index}) => {
          const imageStyle = [
            styles.image,
            index === 0 ? animatedImageStyle : {opacity: 1}, // fadeIn 효과 제거
          ];

          return (
            <Animated.View style={[styles.slide, {opacity: fadeIn}]}>
              <Image source={{uri: image}} style={imageStyle} />
            </Animated.View>
          );
        }}
      />
      {isSlidesArray && slides?.length > 1 ? (
        <Animatable.View
          style={styles.indicators}
          animation={'fadeInUp'}
          delay={550}
          duration={400}
          easing={'ease-in-out'}>
          <CarouselIndicators
            slidesCount={slides.length}
            slideWidth={sizes.width}
            dotSize={12}
            dotSpacing={8}
            scrollAnimated={scrollAnimated}
          />
        </Animatable.View>
      ) : null}
    </>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    slide: {
      width: sizes.width,
      height: sizes.height,
    },
    image: {
      width: sizes.width,
      height: sizes.height,
      resizeMode: 'cover',
    },
    indicators: {
      position: 'absolute',
      width: sizes.width,
      bottom: 60,
      alignItems: 'center',
    },
  });

export default TourDetailsCarousel;
