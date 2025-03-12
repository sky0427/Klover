import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  Image,
} from 'react-native';
import React from 'react';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import CustomText from './CustomText';
import {TourPostDto} from '@/types';
import Wrapper from './Wrapper';
import {colors} from '@/constants/colors';
import CustomIcon from './CustomIcon';

interface CustomCardProps {
  data: TourPostDto;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  data,
  onPress,
  style,
  disabled = false,
  ...props
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}>
      <Wrapper ph={8} pv={8} style={styles.cardContainer}>
        <Image
          source={
            data.firstimage
              ? data.firstimage
              : require('@/assets/images/no-image.png')
          }
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <CustomText
            fontWeight="semibold"
            style={styles.title}
            numberOfLines={1}>
            {data.title}
          </CustomText>
          <View style={styles.addrContainer}>
            <CustomIcon
              name="LocationLineSvg"
              size={14}
              color={colors[theme].TEXT}
            />
            <CustomText
              fontWeight="regular"
              style={styles.address}
              numberOfLines={1}>
              {data.addr1}
            </CustomText>
          </View>

          <View style={styles.ratingContainer}>
            <CustomIcon
              name="ThumbupLineSvg"
              size={14}
              color={colors[theme].PRIMARY}
            />
            <CustomText fontWeight="regular" style={styles.avgRating}>
              {data.avgRating}
            </CustomText>
          </View>
        </View>
      </Wrapper>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    cardContainer: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 12,
      gap: 12,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#d3d3d3',
      borderRadius: 16,
      backgroundColor: colors[theme].GRAY_100,
      elevation: 4,
      shadowColor: colors[theme].PRIMARY,
      shadowOffset: {width: 1, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 20,
    },
    contentContainer: {
      flex: 1,
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingVertical: 6,
    },
    innerContainer: {
      gap: 6,
    },
    pressed: {
      opacity: 0.7,
    },
    image: {
      width: '28%',
      aspectRatio: 1,
      borderRadius: 16,
    },
    title: {
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    addrContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 6,
    },
    address: {
      fontSize: 12,
      color: colors[theme].TEXT,
    },
    ratingContainer: {
      flexDirection: 'row',
      gap: 6,
      alignItems: 'center',
      marginLeft: 1,
      marginBottom: 6,
    },
    avgRating: {
      fontSize: 13,
      color: colors[theme].TEXT,
    },
  });

export default CustomCard;
