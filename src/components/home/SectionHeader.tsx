import {colors} from '@/constants/colors';
import {sizes, spacing} from '@/constants/theme';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from '../shared/CustomText';

interface SectionHeaderProps {
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
  buttonLabel?: string;
  button?: boolean;
}

const SectionHeader = ({
  title,
  containerStyle,
  textStyle,
  onPress,
  buttonLabel = 'See All',
  button = false,
}: SectionHeaderProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText fontWeight="bold" style={styles.title}>
        {title}
      </CustomText>
      {button && (
        <TouchableOpacity onPress={onPress}>
          <CustomText fontWeight="medium" style={[styles.btnText, textStyle]}>
            {buttonLabel}
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginLeft: spacing.l,
      marginRight: spacing.m,
      marginBottom: spacing.m,
    },
    title: {
      fontSize: sizes.h3,
      color: colors[theme].BLACK,
    },
    btnText: {
      fontSize: sizes.h4,
      color: colors[theme].PRIMARY,
    },
  });
export default SectionHeader;
