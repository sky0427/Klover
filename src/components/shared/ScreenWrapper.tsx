import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {colors} from '@/constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  style?: ViewStyle;
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
      <StatusBar translucent barStyle={'default'} />
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
