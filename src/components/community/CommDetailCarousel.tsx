import {sizes} from '@/constants/theme';
import {
  useAddCommPostLikeMutation,
  useAddCommPostSaveMutation,
  useCommPostDetailQuery,
  useDeleteCommPostLikeMutation,
  useDeleteCommPostMutation,
  useDeleteCommPostSaveMutation,
} from '@/hooks/react-query/useCommPostQueries';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {AnimatedFlashList} from '@shopify/flash-list';
import React, {useRef} from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CarouselIndicators from '../shared/CarouselIndicators';

interface CommDetailCarouselProps {
  id: number;
}
const CommDetailCarousel: React.FC<CommDetailCarouselProps> = ({id}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const {data} = useCommPostDetailQuery(id);
  const {mutate: addLikeMutate} = useAddCommPostLikeMutation(id);
  const {mutate: addSaveMutate} = useAddCommPostSaveMutation(id);
  const {mutate: deleteLikeMutate} = useDeleteCommPostLikeMutation(id);
  const {mutate: deleteSaveMutate} = useDeleteCommPostSaveMutation(id);

  const {mutate: deleteMutate} = useDeleteCommPostMutation(id);

  return (
    <>
      <AnimatedFlashList
        data={data?.imageUrls}
        horizontal
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollAnimated}}}],
          {useNativeDriver: false},
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.slide}>
              <Image source={{uri: item}} style={styles.image} />
            </View>
          );
        }}
        estimatedItemSize={sizes.width}
      />

      {data?.imageUrls.length! > 1 && (
        <Animatable.View
          style={styles.indicators}
          animation={'fadeInUp'}
          delay={550}
          duration={400}
          easing={'ease-in-out'}>
          <CarouselIndicators
            slidesCount={data?.imageUrls.length as number}
            slideWidth={sizes.width}
            dotSize={12}
            dotSpacing={8}
            scrollAnimated={scrollAnimated}
          />
        </Animatable.View>
      )}
    </>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
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

export default CommDetailCarousel;
