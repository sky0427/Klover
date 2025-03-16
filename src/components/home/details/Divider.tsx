import {colors} from '@/constants/colors';
import {spacing} from '@/constants/theme';
import useThemeStore from '@/store/useThemeStore';
import React, {forwardRef} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

interface DividerProps {
  style?: StyleProp<ViewStyle>;
  enabledSpacing?: boolean;
}

const Divider = forwardRef(
  ({style, enabledSpacing = true}: DividerProps, ref: any) => {
    const {theme} = useThemeStore();
    return (
      <View
        ref={ref}
        style={[
          {
            height: 1,
            backgroundColor: colors[theme].GRAY_100,
            marginHorizontal: enabledSpacing ? spacing.l : 0,
          },
          style,
        ]}
      />
    );
  },
);

export default Divider;
