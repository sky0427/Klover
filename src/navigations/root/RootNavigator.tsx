import RetryErrorBoundary from '@/components/shared/RetryErrorBoundary';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

function RootNavigator() {
  const isLogin = true;

  return (
    <RetryErrorBoundary>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
