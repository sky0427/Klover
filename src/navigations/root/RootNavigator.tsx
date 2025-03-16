import RetryErrorBoundary from '@/components/shared/RetryErrorBoundary';
import useAuthStore from '@/store/zustand/useAuthStore';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

function RootNavigator() {
  const {user} = useAuthStore();
  //
  const isLogin = true;

  return (
    <RetryErrorBoundary>
      {user ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
