import {mainNavigation} from '@/constants/navigations';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';
import {MapStackParamList} from '../stack/MapStackNavigator';
import HomeStackNavigator, {
  HomeStackParamList,
} from '../stack/HomeStackNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import {Dimensions} from 'react-native';
import {colors} from '@/constants/colors';
import MapTestScreen from '../root/MapTestScreen';
import {
  CompassFillSvg,
  CompassLineSvg,
  HomeFillSvg,
  HomeLineSvg,
} from '@/constants/icons';
import CustomIcon from '@/components/shared/CustomIcon';
import CommunityScreen from '@/screens/community';
import SettingScreen from '@/screens/setting';
import NotificationScreen from '@/screens/notification';
import MessageScreen from '@/screens/message';

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
  return (
    <Drawer.Navigator
      initialRouteName={mainNavigation.HOME}
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
        drawerActiveTintColor: '#f8f8f8',
        drawerActiveBackgroundColor: '#A78BFA',
        drawerLabelStyle: {
          fontSize: 16,
        },
        drawerItemStyle: {
          padding: 3,
          marginBottom: 12,
        },
      })}>
      <Drawer.Screen
        name={mainNavigation.HOME}
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          drawerIcon: () => (
            <CustomIcon name="HomeLineSvg" size={24} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name={mainNavigation.EXPLORE}
        component={MapTestScreen}
        options={{
          title: 'Explore',
          drawerIcon: () => (
            <CustomIcon name="CompassLineSvg" size={24} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name={mainNavigation.COMMUNITY}
        component={CommunityScreen}
        options={{
          title: 'Community',
          drawerIcon: () => (
            <CustomIcon name="Message1LineSvg" size={24} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name={mainNavigation.NOTIFICATION}
        component={NotificationScreen}
        options={{
          title: 'Notification',
          drawerIcon: () => (
            <CustomIcon name="AnnounceLineSvg" size={24} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name={mainNavigation.MESSAGES}
        component={MessageScreen}
        options={{
          title: 'Messages',
          drawerIcon: () => (
            <CustomIcon name="SendLineSvg" size={24} color="#fff" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
