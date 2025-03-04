import RetryErrorBoundary from '@/components/shared/RetryErrorBoundary';
import {View} from 'react-native';
import SignupScreen from '@/screens/auth/SignupScreen';
import TestScreen from './TestScreen';
import MapTestScreen from './MapTestScreen';

function RootNavigator() {
  const isLogin = true;

  return (
    <RetryErrorBoundary>
      {isLogin ? <MapTestScreen /> : <View />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
