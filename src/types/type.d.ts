import {ReactNode} from 'react';
import {PressableProps, StyleProp, TextStyle, ViewStyle} from 'react-native';

declare type ThemeMode = 'light' | 'dark';

declare interface ThemeState {
  theme: ThemeMode;
  isSystem: boolean;
  setTheme: (theme: ThemeMode) => void;
  setSystemTheme: (flag: boolean) => void;
}

declare interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  inValid?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}
