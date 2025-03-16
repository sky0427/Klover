import CustomText from '@/components/shared/CustomText';
import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface FilterChipProps {
  label: string;
  value: any;
  isActive: boolean;
  onPress: (value: any) => void;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  value,
  isActive,
  onPress,
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={() => onPress(value)}>
      <CustomText style={[styles.chipText]}>{label}</CustomText>
    </TouchableOpacity>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    chip: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors[theme].BORDER,
      marginRight: 8,
    },
    chipActive: {
      borderColor: colors[theme].PRIMARY,
    },
    chipText: {
      fontSize: 14,
      color: colors[theme].UNCHANGE_BLACK,
    },
  });

export default FilterChip;
