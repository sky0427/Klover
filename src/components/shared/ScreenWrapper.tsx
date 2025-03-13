import {colors} from '@/constants/colors';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import React, {ReactNode} from 'react';
import {Platform, StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  style?: ViewStyle | ViewStyle[];
  children: ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({style, children}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();

  const paddingTop =
    Platform.OS === 'ios' ? insets.top : Math.max(insets.top, 24);
  const paddingBottom =
    Platform.OS === 'ios' ? insets.bottom : Math.max(insets.bottom, 16);

  return (
    <View style={[styles.container, style, {paddingTop, paddingBottom}]}>
      <StatusBar
        translucent
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={'transparent'}
      />
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].BACKGROUND,
    },
  });
