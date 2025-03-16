import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React, {useMemo, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {sizes} from '../../constants/theme';

interface CarouselIndicatorsProps {
  slidesCount: number;
  dotSize: number;
  dotSpacing: number;
  slideWidth: number;
  scrollAnimated: Animated.Value;
}

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  slidesCount,
  dotSize,
  dotSpacing,
  slideWidth,
  scrollAnimated,
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const slides = useRef(Array.from(Array(slidesCount).keys())).current;

  const {inputRange, translateOutputRange, widthOutputRange} = useMemo(
    () =>
      slides.reduce(
        (acc, _, index, arr) => {
          const width = slideWidth * index;
          const translateX = index * (dotSize + dotSpacing);
          acc.inputRange.push(width as never);
          acc.translateOutputRange.push(translateX as never);
          acc.widthOutputRange.push(dotSize as never);

          if (index < arr.length - 1) {
            acc.inputRange.push((width + slideWidth / 2) as never);
            acc.translateOutputRange.push(translateX as never);
            acc.widthOutputRange.push((dotSize * 2 + dotSpacing) as never);
          }
          return acc;
        },
        {inputRange: [], translateOutputRange: [], widthOutputRange: []},
      ),
    [dotSize, dotSpacing, slideWidth, slides],
  );

  return (
    <View style={styles.container}>
      {slides.map((_, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                marginHorizontal: dotSpacing / 2,
              },
            ]}
          />
        );
      })}
      <Animated.View
        style={[
          styles.indicator,
          {
            height: dotSize,
            left: dotSpacing / 2 + 2,
            transform: [
              {
                translateX: scrollAnimated.interpolate({
                  inputRange,
                  outputRange: translateOutputRange,
                }),
              },
            ],
            width: scrollAnimated.interpolate({
              inputRange,
              outputRange: widthOutputRange,
            }),
          },
        ]}
      />
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors[theme].UNCHANGE_WHITE,
      paddingHorizontal: 2,
      paddingVertical: 4,
      borderRadius: sizes.radius,
    },
    dot: {
      backgroundColor: colors[theme].PRIMARY,
      opacity: 0.3,
      borderRadius: 12,
    },
    indicator: {
      position: 'absolute',
      backgroundColor: colors[theme].PRIMARY,
      borderRadius: sizes.radius,
      top: 4,
    },
  });

export default CarouselIndicators;
