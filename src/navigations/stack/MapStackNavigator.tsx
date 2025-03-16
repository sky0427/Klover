import {mapNavigations} from '@/constants/navigations';
import AddPostScreen from '@/screens/explore/AddPostScreen';
import ExploreScreen from '@/screens/explore/ExploreScreen';
import SearchLocationScreen from '@/screens/explore/SearchLocationScreen';
import useThemeStore from '@/store/useThemeStore';
import {createStackNavigator} from '@react-navigation/stack';
import {LatLng} from 'react-native-maps';

export type MapStackParamList = {
  [mapNavigations.MAP_HOME]: undefined;
  [mapNavigations.ADD_POST]: {location: LatLng};
  [mapNavigations.SEARCH_LOCATION]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

function MapStackNavigator() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={mapNavigations.MAP_HOME}
        component={ExploreScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: 'Add Post',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={mapNavigations.SEARCH_LOCATION}
        component={SearchLocationScreen}
        options={{
          headerTitle: 'Search Location',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MapStackNavigator;
