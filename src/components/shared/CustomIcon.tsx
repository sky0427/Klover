import {SvgProps} from 'react-native-svg';
import * as Icons from '@/constants/icons';
import {Pressable, StyleProp, View, ViewStyle} from 'react-native';

export interface CustomIconProps extends SvgProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

function CustomIcon({
  name,
  size,
  color,
  onPress,
  style,
  ...restProps
}: CustomIconProps) {
  const SvgIcon = Icons[name];

  const width = size;
  const height = size;

  const sizeProps = {
    ...(width !== undefined ? {width} : {}),
    ...(height !== undefined ? {height} : {}),
  };

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper onPress={onPress} style={style}>
      <SvgIcon {...sizeProps} {...restProps} color={color} fill={color} />
    </Wrapper>
  );
}

export default CustomIcon;
