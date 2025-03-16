import CustomIcon from '@/components/shared/CustomIcon';
import {colors} from '@/constants/colors';
import * as Icons from '@/constants/icons';
import {commNavigations, commTabNavigations} from '@/constants/navigations';
import {sizes} from '@/constants/theme';
import CommFavoriteScreen from '@/screens/community/CommFavoriteScreen';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import React, {useMemo, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import CommStackNavigator from '../stack/CommStackNavigator';

export type CommTabParamList = {
  [commTabNavigations.COMM_HOME]: {
    screen: typeof commNavigations.COMM_DETAIL;
    params: {id: number};
    initial: boolean;
  };
  [commTabNavigations.ADD_POST]: undefined;
  [commTabNavigations.COMM_FAVORITE]: undefined;
};

const Tab = createBottomTabNavigator<CommTabParamList>();

interface TabBarIconProps {
  route: RouteProp<CommTabParamList, keyof CommTabParamList>;
  focused: boolean;
  theme: ThemeMode;
}

function TabBarIcons({route, focused, theme}: TabBarIconProps) {
  const iconName = useMemo(() => {
    switch (route.name) {
      case commTabNavigations.COMM_HOME:
        return focused ? 'Message3FillSvg' : 'Message3LineSvg';
      case commTabNavigations.COMM_FAVORITE:
        return focused ? 'HeartFillSvg' : 'HeartLineSvg';
      case commTabNavigations.ADD_POST:
        return focused ? 'AddFillSvg' : 'AddLineSvg';
      default:
        return 'Message3LineSvg';
    }
  }, [route.name, focused]);

  return (
    <CustomIcon
      name={iconName as keyof typeof Icons}
      size={24}
      color={focused ? colors[theme].PRIMARY : colors[theme].GRAY_300}
    />
  );
}

const CommTabNavigator = () => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const offsetAnimation = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Tab.Navigator
        initialRouteName={commTabNavigations.COMM_HOME}
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabBarIcons route={route} focused={focused} theme={theme} />
          ),
        })}
        screenListeners={({route}) => ({
          focus: () => {
            const index = Object.keys(commTabNavigations).indexOf(route.name);
            Animated.spring(offsetAnimation, {
              toValue: index * (sizes.width / 3),
              useNativeDriver: true,
            }).start();
          },
        })}>
        <Tab.Screen
          name={commTabNavigations.COMM_HOME}
          component={CommStackNavigator}
        />
        {/* <Tab.Screen
          name={commTabNavigations.ADD_POST}
          component={AddCommPostScreen}
        /> */}
        <Tab.Screen
          name={commTabNavigations.COMM_FAVORITE}
          component={CommFavoriteScreen}
        />
      </Tab.Navigator>

      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: offsetAnimation,
              },
            ],
          },
        ]}
      />
    </>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    indicator: {
      position: 'absolute',
      width: 10,
      height: 2,
      left: sizes.width / 3 / 2 - 5,
      bottom: 30,
      backgroundColor: colors[theme].PRIMARY,
      zIndex: 100,
    },
  });

export default CommTabNavigator;
