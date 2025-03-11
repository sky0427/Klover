import RetryErrorBoundary from '@/components/shared/RetryErrorBoundary';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import SearchTourPostsScreen from '@/screens/home/SearchTourPostsScreen';
import TestScreen from './TestScreen';

function RootNavigator() {
  const isLogin = true;

  return (
    <RetryErrorBoundary>
      {isLogin ? <SearchTourPostsScreen /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
