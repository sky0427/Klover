import React, {ReactNode} from 'react';
import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';

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
        styles.container,
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Wrapper;
