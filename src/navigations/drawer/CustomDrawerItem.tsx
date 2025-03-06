import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import * as Icons from '@/constants/icons';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import CustomText from '@/components/shared/CustomText';
import CustomIcon from '@/components/shared/CustomIcon';

interface CustomDrawerItemProps {
  label: string;
  icon: keyof typeof Icons;
  onPress: () => void;
  isActive: boolean;
}

const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({
  label,
  icon,
  onPress,
  isActive,
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <Pressable style={styles.drawerItemContainer} onPress={onPress}>
      <CustomIcon name={icon} size={24} color="#fff" />
      <CustomText
        fontWeight="medium"
        style={[
          styles.drawerItemLabel,
          isActive && styles.activeDrawerItemLabel,
        ]}>
        {label}
      </CustomText>
    </Pressable>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    drawerItemContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      gap: 12,
    },
    drawerItemLabel: {
      fontSize: 15,
      color: '#fff',
    },
    activeDrawerItemLabel: {},
  });

export default CustomDrawerItem;
