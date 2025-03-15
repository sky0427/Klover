import {homeNavigations} from '@/constants/navigations';
import HomeScreen from '@/screens/home/HomeScreen';
import SearchTourPostsScreen from '@/screens/home/SearchTourPostsScreen';
import TourDetailsScreen from '@/screens/home/TourDetailsScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type HomeStackParamList = {
  [homeNavigations.MAIN_HOME]: undefined;
  [homeNavigations.SEARCH]: undefined;
  [homeNavigations.TOUR_DETAIL]: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={homeNavigations.MAIN_HOME}
        component={HomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={homeNavigations.SEARCH}
        component={SearchTourPostsScreen}
        options={{
          headerTitle: 'Search',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={homeNavigations.TOUR_DETAIL}
        component={TourDetailsScreen}
        options={{
          presentation: 'modal',
          headerTitle: '장소 검색',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
