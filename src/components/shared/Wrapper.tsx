import {sizes} from '@/constants/theme';
import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface WrapperProps {
  style?: ViewStyle;
  children: ReactNode;
  mv?: number;
  mt?: number;
  mb?: number;
  ph?: number;
  pv?: number;
  bgColor?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  style,
  children,
  bgColor,
  mv,
  mt,
  mb,
  pv,
  ph = sizes.width * 0.05,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: pv,
          paddingHorizontal: ph,
          marginVertical: mv,
          marginTop: mt,
          marginBottom: mb,
          backgroundColor: bgColor,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Wrapper;
