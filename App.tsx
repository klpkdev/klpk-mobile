/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/RootStackParamList';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Route from './routes';
import {NotificationContextProvider} from './contexts/notification';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationContextProvider>
            <Route />
          </NotificationContextProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
      <Toast />
    </GestureHandlerRootView>
  );
}

export default App;
