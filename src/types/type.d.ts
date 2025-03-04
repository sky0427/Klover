import {ReactNode} from 'react';
import {PressableProps, StyleProp, TextStyle, ViewStyle} from 'react-native';

declare type ThemeMode = 'light' | 'dark';
declare interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  inValid?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}
