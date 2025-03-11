import {authNavigations} from '@/constants/navigations';
import SigninScreen from '@/screens/auth/SigninScreen';
import SignupScreen from '@/screens/auth/SignupScreen';
import WelcomScreen from '@/screens/auth/WelcomScreen';
import useThemeStore from '@/store/useThemeStore';
import {createStackNavigator} from '@react-navigation/stack';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.SIGNIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  const {theme} = useThemeStore();

  return (
    <Stack.Navigator initialRouteName={authNavigations.SIGNIN}>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={WelcomScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.SIGNIN}
        component={SigninScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.SIGNUP}
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
