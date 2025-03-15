import {colors} from '@/constants/colors';
import {mapNavigations} from '@/constants/navigations';
import ExploreScreen from '@/screens/explore/ExploreScreen';
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

export default MapStackNavigator;
