import {homeNavigations} from '@/constants/navigations';
import FilterTourPostScreen from '@/screens/home/FilterTourPostScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import SearchTourPostsScreen from '@/screens/home/SearchTourPostsScreen';
import TourDetailsScreen from '@/screens/home/TourDetailsScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type HomeStackParamList = {
  [homeNavigations.MAIN_HOME]: undefined;
  [homeNavigations.SEARCH]: undefined;
  [homeNavigations.TOUR_DETAIL]: {id: number};
  [homeNavigations.FILTER]: undefined;
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
          headerTitle: 'Tour Detail',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={homeNavigations.FILTER}
        component={FilterTourPostScreen}
        options={{
          headerTitle: 'Filter',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
