import {homeNavigations} from '@/constants/navigations';
import HomeScreen from '@/screens/home/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type HomeStackParamList = {
  [homeNavigations.MAIN_HOME]: undefined;
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
