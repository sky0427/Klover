import {View, ViewStyle, StyleSheet, Dimensions} from 'react-native';
import React, {ReactNode} from 'react';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';

interface WrapperProps {
  style?: ViewStyle;
  children: ReactNode;
  mv?: number;
  ph?: number;
  pv?: number;
  bgColor?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  style,
  children,
  bgColor,
  mv,
  pv,
  ph = Dimensions.get('screen').width * 0.05,
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View
      style={[
        style,
        {
          paddingVertical: pv,
          paddingHorizontal: ph,
          marginVertical: mv,
          backgroundColor: bgColor,
        },
      ]}>
      {children}
    </View>
  );
};

const styling = (theme: ThemeMode) => StyleSheet.create({});

export default Wrapper;
