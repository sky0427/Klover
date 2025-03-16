import {colors} from '@/constants/colors';
import {homeNavigations} from '@/constants/navigations';
import {sizes, spacing} from '@/constants/theme';
import {HomeStackParamList} from '@/navigations/stack/HomeStackNavigator';
import useThemeStore from '@/store/useThemeStore';
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

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

interface Place {
  id: number;
  title: string;
  location: string;
  image: any;
}

interface PlaceCarouselProps {
  data: Place[];
}

type Navigation = StackNavigationProp<HomeStackParamList>;

const PlaceCarousel: React.FC<PlaceCarouselProps> = ({data}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();
  const [active, setActive] = useState(false);

  const handleFavoritePress = () => {
    setActive(!active);
  };

  const handleCardPress = () => {
    navigation.navigate(homeNavigations.FILTER);
  };

  return (
    <FlatList
      data={data}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={i => i.id.toString()}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
              marginLeft: spacing.width * 0.05,
              marginRight: index === data.length - 1 ? spacing.width * 0.05 : 0,
            }}
            onPress={handleCardPress}>
            <View style={[styles.card]}>
              <TouchableOpacity
                style={[styles.button, styles.favorite]}
                onPress={handleFavoritePress}>
                <CustomIcon
                  name="HeartFillSvg"
                  size={20}
                  color={
                    active ? colors[theme].DANGER : colors[theme].UNCHANGE_WHITE
                  }
                />
              </TouchableOpacity>

              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>

              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
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
      top: CARD_HEIGHT - 80,
      left: spacing.m,
      zIndex: 1,
    },
    title: {
      fontSize: sizes.h2,
      color: colors[theme].UNCHANGE_WHITE,
      fontWeight: 'bold',
    },
    location: {
      fontSize: sizes.h4,
      color: colors[theme].UNCHANGE_WHITE,
    },
  });

export default PlaceCarousel;
