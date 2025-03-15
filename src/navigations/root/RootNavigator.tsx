import RetryErrorBoundary from '@/components/shared/RetryErrorBoundary';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuthStore from '@/store/zustand/useAuthStore';
import {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';

function RootNavigator() {
  const {isAuthenticated, isLoading, initializeAuth} = useAuthStore();

  const isLogin = true;

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <RetryErrorBoundary>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
