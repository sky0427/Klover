import {colors} from '@/constants/colors';
import {sizes} from '@/constants/theme';
import useThemeStore from '@/store/useThemeStore';
import {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface CustomBackgroundProps extends BottomSheetBackgroundProps {
  animatedIndex: SharedValue<number>;
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({
  animatedIndex,
  style,
}) => {
  const {theme} = useThemeStore();
  const baseStyle = StyleSheet.flatten(style) || {};

  const containerStyle = useAnimatedStyle(() => ({
    ...baseStyle,
    backgroundColor: colors[theme].WHITE,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));
  return <Animated.View style={containerStyle} />;
};

export default CustomBackground;
