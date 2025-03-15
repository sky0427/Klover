import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {colors} from '@/constants/colors';
import {sizes} from '@/constants/theme';

interface CardProps {
  style: ViewStyle;
  onPress: () => void;
  children: ReactNode;
}

const Card = ({style, onPress, children}: CardProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <View style={styles.inner}>{children}</View>
    </TouchableOpacity>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    card: {
      width: 200,
      height: 200,
      backgroundColor: colors[theme].UNCHANGE_WHITE,
      borderRadius: sizes.radius,
    },
    inner: {
      width: '100%',
      height: '100%',
    },
  });

export default Card;
