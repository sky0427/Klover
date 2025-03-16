import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {
  getCorrectRating,
  getFractionDigitsRating,
  getRatingLabel,
} from '@/utils/ratings';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';

interface RatingProps {
  showLabelInline?: boolean;
  showLabelTop?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  rating: number;
  disabled?: boolean;
  size?: number;
}

const Rating: React.FC<RatingProps> = ({
  showLabelInline = false,
  showLabelTop = false,
  containerStyle,
  rating,
  disabled = true,
  size = 12,
}) => {
  const _rating = getCorrectRating(rating);
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View
      style={[styles.container, containerStyle]} // concat 제거
    >
      {showLabelTop && (
        <Text style={styles.label}>
          {getRatingLabel(_rating)} {getFractionDigitsRating(rating)}
        </Text>
      )}
      <AirbnbRating
        defaultRating={_rating}
        count={5}
        showRating={false}
        selectedColor={colors[theme].PRIMARY}
        isDisabled={disabled}
        size={size}
      />
      {showLabelInline && (
        <Text style={styles.label}>{getFractionDigitsRating(rating)}</Text>
      )}
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      alignItems: 'flex-end',
      marginHorizontal: -2,
    },
    containerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      color: colors[theme].PRIMARY,
      marginLeft: 4,
    },
  });

export default Rating;
