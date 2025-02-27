import RetryErrorBoundary from '@/components/shared/RetryErrorBoundary';
import {View} from 'react-native';

function RootNavigator() {
  const isLogin = true;

  return (
    <RetryErrorBoundary>{isLogin ? <View /> : <View />}</RetryErrorBoundary>
  );
}

export default RootNavigator;
