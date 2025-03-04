import {mainNavigation} from '@/constants/navigations';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigatorScreenParams} from '@react-navigation/native';
import {MapStackParamList} from '../stack/MapStackNavigator';
import HomeStackNavigator, {
  HomeStackParamList,
} from '../stack/HomeStackNavigator';

export type MainDrawerParamList = {
  [mainNavigation.HOME]: NavigatorScreenParams<HomeStackParamList>;
  [mainNavigation.EXPLORE]: NavigatorScreenParams<MapStackParamList>;
  // [mainNavigation.COMMUNITY]: NavigatorScreenParams<>;
  // [mainNavigation.SETTING]: NavigatorScreenParams<>;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
  <Drawer.Navigator>
    <Drawer.Screen
      name={mainNavigation.HOME}
      component={HomeStackNavigator}
      options={{
        title: '홈',
        // swipeEnabled: false,
      }}
    />
  </Drawer.Navigator>;
}

export default MainDrawerNavigator;
