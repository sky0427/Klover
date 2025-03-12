import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {colors} from '@/constants/colors';
import Wrapper from './Wrapper';

const CustomBanner = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <Wrapper>
        <Text>CustomBanner</Text>
      </Wrapper>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].PRIMARY,
    },
  });

export default CustomBanner;
