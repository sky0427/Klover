import {commNavigations} from '@/constants/navigations';
import CommDetailScreen from '@/screens/community/CommDetailScreen';
import CommHomeScreen from '@/screens/community/CommHomeScreen';
import EditCommPostScreen from '@/screens/community/EditCommPostScreen';
import useThemeStore from '@/store/useThemeStore';
import {createStackNavigator} from '@react-navigation/stack';
import {LatLng} from 'react-native-maps';

export type CommStackParamList = {
  [commNavigations.COMM_HOME]: {
    screen: typeof commNavigations.COMM_DETAIL;
    params: {id: number};
    initial: boolean;
  };
  [commNavigations.COMM_DETAIL]: {id: number};
  [commNavigations.EDIT_POST]: {location: LatLng};
};

const Stack = createStackNavigator<CommStackParamList>();

function CommStackNavigator() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={commNavigations.COMM_HOME}
        component={CommHomeScreen}
      />
      <Stack.Screen
        name={commNavigations.COMM_DETAIL}
        component={CommDetailScreen}
      />
      <Stack.Screen
        name={commNavigations.EDIT_POST}
        component={EditCommPostScreen}
      />
    </Stack.Navigator>
  );
}

export default CommStackNavigator;
