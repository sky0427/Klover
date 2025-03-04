import {colors} from '@/constants/colors';
import {homeNavigations} from '@/constants/navigations';
import ExploreScreen from '@/screens/explore';
import HomeScreen from '@/screens/home';
import useThemeStore from '@/store/useThemeStore';
import {createStackNavigator} from '@react-navigation/stack';
import {LatLng} from 'react-native-maps';

export type HomeStackParamList = {
  [homeNavigations.HOME]: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={homeNavigations.HOME}
        component={HomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name={mapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
      <Stack.Screen
        name={mapNavigations.SEARCH_LOCATION}
        component={SearchLocationScreen}
        options={{
          presentation: 'modal',
          headerTitle: '장소 검색',
        }}
      /> */}
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
