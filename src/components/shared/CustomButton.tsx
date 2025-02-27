import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {CustomButtonProps, ThemeMode} from '@/types/type';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

const deviceHeight = Dimensions.get('screen').height;

const CustomButton = ({
  label,
  variant = 'filled',
  inValid = false,
  style = null,
  textStyle = null,
  icon = null,
  ...props
}: CustomButtonProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable
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
        <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      borderRadius: 3,
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
      borderWidth: 1,
    },
    filledPressed: {
      backgroundColor: colors[theme].SECONDARY,
    },
    outlinedPressed: {
      borderColor: colors[theme].SECONDARY,
      borderWidth: 1,
      opacity: 0.5,
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
      fontWeight: '700',
    },
    filledText: {
      color: colors[theme].GRAY_100,
    },
    outlinedText: {
      color: colors[theme].PRIMARY,
    },
  });

export default CustomButton;
