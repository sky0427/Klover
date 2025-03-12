import React, {ReactNode} from 'react';
import {Dimensions, View, ViewStyle} from 'react-native';

interface WrapperProps {
  style?: ViewStyle;
  children: ReactNode;
  mv?: number;
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
  mb,
  pv,
  ph = Dimensions.get('screen').width * 0.05,
}) => {
  return (
    <View
      style={[
        {
          paddingVertical: pv,
          paddingHorizontal: ph,
          marginVertical: mv,
          marginBottom: mb,
          backgroundColor: bgColor,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default Wrapper;
