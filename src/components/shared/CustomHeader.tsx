import {
  View,
  Text,
  TextStyle,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import CustomIcon, {CustomIconProps} from './CustomIcon';
import CustomText from './CustomText';
import {ThemeMode} from '@/types/type';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/constants/colors';
import {StackHeaderProps} from '@react-navigation/stack';

interface LabelViewProps {
  text: string;
  icon: CustomIconProps;
  style?: TextStyle;
}

interface CustomHeaderProps extends StackHeaderProps {
  leftIcon?: CustomIconProps;
  centerLabel?: LabelViewProps;
  rightIcons?: CustomIconProps[];
  isVisible: boolean;
}

const LabelView: React.FC<LabelViewProps> = ({
  text,
  style,
  icon,
  ...restProps
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.labelContainer}>
      <CustomText style={style} {...restProps}>
        {text}
      </CustomText>
      <CustomIcon {...icon} />
    </View>
  );
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  leftIcon,
  centerLabel,
  rightIcons,
  isVisible,
  navigation,
  route,
  options,
  back,
}) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [headerVisible, setHeaderVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // const handleScroll = route.params?.handleScroll;
  // const prevScrollY = route.params?.prevScrollY;

  // useEffect(() => {
  //   if (handleScroll && route.params.scrollDirection === 'down') {
  //     Animated.timing(fadeAnim, {
  //       toValue: isVisible ? 1 : 0,
  //       duration: 200,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // }, [route.params?.scrollDirection, fadeAnim, handleScroll]);

  return (
    <Animated.View style={[styles.headerContainer, {opacity: fadeAnim}]}>
      <View style={styles.innerContainer}>
        <View style={styles.leftContainer}>
          {leftIcon && <CustomIcon {...leftIcon} />}
        </View>
        <View style={styles.centerContainer}>
          {centerLabel && <LabelView {...centerLabel} />}
        </View>
        <View style={styles.rightContainer}>
          {rightIcons &&
            rightIcons.map((icon, index) => (
              <CustomIcon key={index} {...icon} />
            ))}
        </View>
      </View>
      <View style={styles.banner}>
        <Text>hahahahah</Text>
      </View>
    </Animated.View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
      backgroundColor: colors[theme].BACKGROUND,
      zIndex: 1000,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 64,
      justifyContent: 'space-between',
      paddingHorizontal: Dimensions.get('screen').width * 0.05,
    },
    leftContainer: {
      flex: 1,
      alignItems: 'flex-start',
    },
    centerContainer: {
      flex: 3,
      alignItems: 'center',
    },
    rightContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 3,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
    },
    banner: {
      backgroundColor: colors[theme].PRIMARY,
      paddingVertical: 8,
    },
  });

export default CustomHeader;
