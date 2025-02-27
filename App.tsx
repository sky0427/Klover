import queryClient from '@/utils/queryClient';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
      <GestureHandlerRootView>
        <NavigationContainer>
          <View />
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
