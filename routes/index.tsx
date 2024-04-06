import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../store';
import Guest from './guest';
import Protected from './protected';
import {Alert, StatusBar} from 'react-native';
import {
  getTrackingStatus,
  requestTrackingPermission,
  TrackingStatus,
} from 'react-native-tracking-transparency';
import {withIAPContext} from 'react-native-iap';

const Stack = createNativeStackNavigator();

const Route = () => {
  const token = useAuth(state => state.token);
  const [trackingStatus, setTrackingStatus] = React.useState<
    TrackingStatus | '(loading)'
  >('(loading)');

  React.useEffect(() => {
    getTrackingStatus()
      .then(status => {
        setTrackingStatus(status);
      })
      .catch(e => Alert.alert('Error', e?.toString?.() ?? e));
  }, []);
  
  const request = React.useCallback(async () => {
    try {
      const status = await requestTrackingPermission();
      setTrackingStatus(status);
    } catch (e) {
      Alert.alert('Error', e?.toString?.() ?? e);
    }
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#0d0e10" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {token !== '' ? (
          <Stack.Screen name="ProtectedStack" component={Protected} />
        ) : (
          <Stack.Screen
            name="GuestStack"
            component={Guest}
            options={{
              animationTypeForReplace: token !== '' ? 'push' : 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withIAPContext(Route);
