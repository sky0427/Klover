import {colors} from '@/constants/colors';
import {sizes, spacing} from '@/constants/theme';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from './CustomText';

interface CustomBannerProps {
  content: string;
}

const CustomBanner = ({content}: CustomBannerProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.container}>
      <CustomText fontWeight="regular" style={styles.text} numberOfLines={1}>
        {content}
      </CustomText>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      width: sizes.width,
      backgroundColor: colors[theme].PRIMARY,
      marginBottom: spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: spacing.l,
      borderRadius: 3,
    },
    text: {
      fontSize: sizes.sm,
      color: colors[theme].UNCHANGE_WHITE,
    },
  });

export default CustomBanner;
