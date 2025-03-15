import {colors} from '@/constants/colors';
import RootNavigator from '@/navigations/root/RootNavigator';
import useThemeStore from '@/store/useThemeStore';
import queryClient from '@/utils/queryClient';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import LineLogin from '@xmartlabs/react-native-line';
import Config from 'react-native-config';

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
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
            <Toast config={toastConfig} />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
