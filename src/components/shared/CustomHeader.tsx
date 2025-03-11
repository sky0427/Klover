import {colors} from '@/constants/colors';
import * as Icons from '@/constants/icons';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomIcon from './CustomIcon';
import Wrapper from './Wrapper';

interface CustomHeaderProps {
  leftIconName?: keyof typeof Icons;
  children?: ReactNode;
  rightIconNames?:
    | [keyof typeof Icons]
    | [keyof typeof Icons, keyof typeof Icons];
  iconColor?: string;
  onLeftIconPress?: () => void;
  onRightIconPress1?: () => void;
  onRightIconPress2?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  leftIconName = 'LeftFillSvg',
  children,
  rightIconNames,
  iconColor,
  onLeftIconPress,
  onRightIconPress1,
  onRightIconPress2,
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Wrapper style={styles.container}>
      {/* Left Icon */}
      <TouchableOpacity onPress={onLeftIconPress} style={styles.left}>
        <CustomIcon name={leftIconName} size={24} color={iconColor} />
      </TouchableOpacity>

      {/* Center (Children) */}
      <View style={styles.center}>{children}</View>

      {/* Right Icons */}
      <View style={styles.right}>
        {rightIconNames &&
          rightIconNames.map((iconName, index) => (
            <TouchableOpacity
              key={index}
              onPress={index === 0 ? onRightIconPress1 : onRightIconPress2}
              style={styles.rightIconContainer}>
              <CustomIcon name={iconName} size={22} color={iconColor} />
            </TouchableOpacity>
          ))}
      </View>
    </Wrapper>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 56,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors[theme].BACKGROUND,
    },
    left: {
      width: 60,
      alignItems: 'flex-start',
    },
    center: {
      flex: 1,
      alignItems: 'center',
    },
    right: {
      width: 60,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    rightIconContainer: {
      marginLeft: 12,
    },
  });

export default CustomHeader;
