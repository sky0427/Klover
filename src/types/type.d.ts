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

// declare interface ApiResponse<T> {
//   returnCode: string;
//   returnMessage: string;
//   data?: T; // data는 KloverPage가 아닌 경우에만 존재
//   kloverPage?: KloverPage<T>; // kloverPage는 Pageable 응답인 경우에만 존재
// }

// declare interface KloverPage<T> {
//   contents: T[];
//   pageNumber: number;
//   pageSize: number;
//   totalPages: number;
//   totalCount: number;
// }

declare interface XYForm {
  mapX: number; //longitude (경도)
  mapY: number; // latitude (위도)
  radius: number; // 반경 값 (미터 단위)
}
