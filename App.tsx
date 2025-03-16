import {colors} from '@/constants/colors';
import RootNavigator from '@/navigations/root/RootNavigator';
import useThemeStore from '@/store/useThemeStore';
import queryClient from '@/utils/queryClient';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import LineLogin from '@xmartlabs/react-native-line';
import React, {useEffect} from 'react';
import Config from 'react-native-config';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: colors.light.SUCCESS}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: colors.light.DANGER}}
      text1Style={{
        fontSize: 14,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};

const googleWebClientId = Config.GOOGLE_WEB_CLIENT_ID;
const googleIosClientID = Config.GOOGLE_IOS_CLIENT_ID;
const lineClientId = Config.LINE_CLIENT_ID;

function App(): React.JSX.Element {
  const {theme} = useThemeStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleWebClientId,
      iosClientId: googleIosClientID,
    });
    LineLogin.setup({channelId: lineClientId ?? 'error'});
    // initializeFCM();
  }, []);

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
            <Toast config={toastConfig} />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
