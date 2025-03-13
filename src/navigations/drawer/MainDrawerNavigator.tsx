import CustomIcon from '@/components/shared/CustomIcon';
import {mainNavigation} from '@/constants/navigations';
import CommunityScreen from '@/screens/community';
import MessageScreen from '@/screens/message';
import NotificationScreen from '@/screens/notification';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/type';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import MapTestScreen from '../root/MapTestScreen';
import HomeStackNavigator, {
  HomeStackParamList,
} from '../stack/HomeStackNavigator';
import {MapStackParamList} from '../stack/MapStackNavigator';
import CustomDrawerContent from './CustomDrawerContent';

export type MainDrawerParamList = {
  [mainNavigation.HOME]: NavigatorScreenParams<HomeStackParamList>;
  [mainNavigation.EXPLORE]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigation.COMMUNITY]: undefined;
  [mainNavigation.SETTING]: undefined;
  [mainNavigation.NOTIFICATION]: undefined;
  [mainNavigation.MESSAGES]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Drawer.Navigator
      initialRouteName={mainNavigation.HOME}
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerStyle: styles.drawer,
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        swipeEdgeWidth: 100,
      })}>
      <Drawer.Screen
        name={mainNavigation.HOME}
        component={HomeStackNavigator}
        options={({focused}: any) => ({
          title: 'Home',
          drawerIcon: ({color, size}) => (
            <CustomIcon
              name={focused ? 'HomeFillSvg' : 'HomeLineSvg'}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Drawer.Screen
        name={mainNavigation.EXPLORE}
        component={MapTestScreen}
        options={({focused}: any) => ({
          title: 'Explore',
          drawerIcon: ({color, size}) => (
            <CustomIcon
              name={focused ? 'CompassFillSvg' : 'CompassLineSvg'}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Drawer.Screen
        name={mainNavigation.COMMUNITY}
        component={CommunityScreen}
        options={({focused}: any) => ({
          title: 'Community',
          drawerIcon: ({color, size}) => (
            <CustomIcon
              name={focused ? 'Message1FillSvg' : 'Message1LineSvg'}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Drawer.Screen
        name={mainNavigation.NOTIFICATION}
        component={NotificationScreen}
        options={({focused}: any) => ({
          title: 'Notification',
          drawerIcon: ({color, size}) => (
            <CustomIcon
              name={focused ? 'AnnounceFillSvg' : 'AnnounceLineSvg'}
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Drawer.Screen
        name={mainNavigation.MESSAGES}
        component={MessageScreen}
        options={({focused}: any) => ({
          title: 'Messages',
          drawerIcon: ({color, size}) => (
            <CustomIcon
              name={focused ? 'SendLineSvg' : 'SendFillSvg'}
              size={size}
              color={color}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    drawer: {
      width: '80%',
      backgroundColor: 'rgba(88, 67, 190, 1)',
      // borderTopRightRadius: 50,
      // borderBottomRightRadius: 50,
    },
  });

export default MainDrawerNavigator;
