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

declare interface ApiResponse<T> {
  returnCode: string;
  // data는 KloverPage가 아닌 경우에만 존재
  data?: T;
  // kloverPage는 Pageable 응답인 경우에만 존재
  kloverPage?: KloverPage<T>;
}

declare interface KloverPage<T> {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
}
