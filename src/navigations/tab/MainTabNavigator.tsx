import {colors} from '@/constants/colors';
import {
  CompassFillSvg,
  CompassLineSvg,
  GroupFillSvg,
  GroupLineSvg,
  HomeFillSvg,
  HomeLineSvg,
  UserFillSvg,
  UserLineSvg,
} from '@/constants/icons';
import {mainNavigation} from '@/constants/navigations';
import CommunityScreen from '@/screens/community';
import ExploreScreen from '@/screens/explore';
import HomeScreen from '@/screens/home';
import ProfileScreen from '@/screens/profile';
import useThemeStore from '@/store/useThemeStore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export type MainTabParamList = {
  [mainNavigation.HOME]: undefined;
  [mainNavigation.EXPLORE]: undefined;
  [mainNavigation.COMMUNITY]: undefined;
  [mainNavigation.PROFILE]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  const {theme} = useThemeStore();

  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let IconComponent: SvgComponent;

        switch (route.name) {
          case mainNavigation.HOME:
            IconComponent = focused ? HomeFillSvg : HomeLineSvg;
            break;
          case mainNavigation.EXPLORE:
            IconComponent = focused ? CompassFillSvg : CompassLineSvg;
            break;
          case mainNavigation.COMMUNITY:
            IconComponent = focused ? GroupFillSvg : GroupLineSvg;
            break;
          case mainNavigation.PROFILE:
            IconComponent = focused ? UserFillSvg : UserLineSvg;
            break;
        }
        return (
          <IconComponent
            width={size}
            height={size}
            fill={focused ? color : 'none'}
            stroke={color}
          />
        );
      },
      // tabBarActiveTintColor: colors[theme].WHITE,
      // tabBarInactiveTintColor: colors[theme].TEXT,
      // tabBarBackground: colors[theme].PRIMARY,
      tabBarShowLabel: false,
      headerShown: false,
    })}>
    <Tab.Screen name={mainNavigation.HOME} component={HomeScreen} />
    <Tab.Screen name={mainNavigation.EXPLORE} component={ExploreScreen} />
    <Tab.Screen name={mainNavigation.COMMUNITY} component={CommunityScreen} />
    <Tab.Screen name={mainNavigation.PROFILE} component={ProfileScreen} />
  </Tab.Navigator>;
}

export default MainTabNavigator;
