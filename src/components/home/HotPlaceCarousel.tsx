import {colors} from '@/constants/colors';
import {homeNavigations} from '@/constants/navigations';
import {sizes, spacing} from '@/constants/theme';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {TourPostDto} from '@/types';
import {ThemeMode} from '@/types/type';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomIcon from '../shared/CustomIcon';

const CARD_WIDTH = sizes.width / 1.6;
const CARD_HEIGHT = sizes.width / 1.6;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

interface HotPlaceCarouselProps {
  data: TourPostDto[];
}

const HotPlaceCarousel = ({data}: HotPlaceCarouselProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const [active, setActive] = useState(false);

  const handlePress = (id: number) => {
    navigation.navigate(homeNavigations.TOUR_DETAIL, {id});
  };

  const handlePressFavorite = () => {
    setActive(!active);
  };

  return (
    <FlatList
      data={data}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.contentId.toString()}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: spacing.width * 0.05,
              marginRight: index === data.length - 1 ? spacing.width * 0.05 : 0,
            }}
            onPress={() => handlePress(item.contentId)}>
            <View style={[styles.card]}>
              <TouchableOpacity
                style={[styles.button, styles.favorite]}
                onPress={handlePressFavorite}>
                <CustomIcon
                  name="HeartFillSvg"
                  size={20}
                  color={
                    active ? colors[theme].DANGER : colors[theme].UNCHANGE_WHITE
                  }
                />
              </TouchableOpacity>

              <View style={styles.imageBox}>
                {item?.firstImage ? (
                  <Image
                    source={{uri: item?.firstImage}}
                    style={styles.image}
                  />
                ) : (
                  <CustomIcon
                    name="PicFillSvg"
                    size={110}
                    color="rgba(0, 0, 0, 0.1)"
                    style={[
                      styles.image,
                      {alignItems: 'center', justifyContent: 'center'},
                    ]}
                  />
                )}
              </View>

              <View style={styles.titleBox}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.location}>{item.addr1}</Text>
              </View>

              <View style={styles.gradient} />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
    },
    gradient: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      position: 'absolute',
      bottom: 0,
      borderRadius: sizes.radius,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 50,
      width: 38,
      height: 38,
      alignItems: 'center',
      justifyContent: 'center',
    },
    favorite: {
      position: 'absolute',
      top: spacing.m,
      right: spacing.m,
      zIndex: 1,
    },
    imageBox: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: sizes.radius,
      overflow: 'hidden',
    },
    image: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      resizeMode: 'cover',
    },
    titleBox: {
      position: 'absolute',
      bottom: spacing.m,
      left: spacing.m,
      width: CARD_WIDTH - spacing.m * 2,
      zIndex: 1,
    },
    title: {
      fontSize: sizes.h4,
      color: colors[theme].UNCHANGE_WHITE,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    location: {
      fontSize: sizes.body,
      color: colors[theme].UNCHANGE_WHITE,
    },
  });

export default HotPlaceCarousel;
