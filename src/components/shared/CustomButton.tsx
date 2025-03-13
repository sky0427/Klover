import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React, {ReactNode} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from './CustomText';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  inValid?: boolean;
  style?: ViewStyle;
  icon?: ReactNode;
  isLoading?: boolean;
  onPress?: () => void;
}

const deviceHeight = Dimensions.get('screen').height;

const CustomButton = ({
  label,
  variant = 'filled',
  inValid = false,
  style,
  icon = null,
  isLoading = false,
  onPress,
  ...props
}: CustomButtonProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      onPress={onPress}
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
        style,
      ]}
      {...props}>
      <View style={styles.size}>
        {icon}
        <CustomText
          fontWeight="semibold"
          style={[styles.text, styles[`${variant}Text`]]}>
          {label}
        </CustomText>
      </View>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={
            variant === 'filled' ? colors[theme].WHITE : colors[theme].PRIMARY
          }
          size="small"
        />
      )}
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      height: 56,
      borderRadius: 16,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    inValid: {
      opacity: 0.5,
    },
    filled: {
      backgroundColor: colors[theme].PRIMARY,
    },
    outlined: {
      borderColor: colors[theme].PRIMARY,
      borderWidth: 2,
    },
    filledPressed: {
      backgroundColor: colors[theme].PRIMARY,
      opacity: 0.8,
    },
    outlinedPressed: {
      borderColor: colors[theme].PRIMARY,
      borderWidth: 1,
      opacity: 0.8,
    },
    size: {
      width: '100%',
      paddingVertical: deviceHeight > 700 ? 16 : 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 6,
    },
    text: {
      fontSize: 16,
    },
    filledText: {
      color: colors[theme].UNCHANGE_WHITE,
    },
    outlinedText: {
      color: colors[theme].PRIMARY,
    },
  });

export default CustomButton;
