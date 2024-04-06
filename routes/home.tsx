import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconAccount, IconBook, IconHome, IconWrite} from '../components/Icons';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WriteScreen from '../screens/WriteScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import HomeDetailStack from './homeDetail';
import {HeaderBottomTab} from '../components/Header';
import BottomTabProfile from '../components/Header/BottomTabProfile';
import {Image} from 'react-native';
import {useMe} from '../services/current-user/query';
import {useMemo} from 'react';
import ProfileDetailStack from './profileDetail';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const {data: me} = useMe();

  const avatar = useMemo(() => {
    if (me?.data?.photos) {
      const temp = me?.data?.photos.filter(
        (item: {type: string}) => item.type === 'avatar',
      );
      if (temp.length > 0) {
        return temp[0].url;
      }
      return null;
    } else {
      return null;
    }
  }, [me?.data]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000',
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#D6B16D',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeDetailStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconHome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconBook name="library" color={color} size={size} />
          ),
          headerShown: true,
          header: props => {
            return (
              <HeaderBottomTab
                {...props}
                onPressWallet={() => props.navigation.navigate('WalletScreen')}
                onPressNotification={() =>
                  props.navigation.navigate('NotificationScreen')
                }
              />
            );
          },
        }}
      />
      {me?.data?.verification?.id && (
        <Tab.Screen
          name="WriteScreen"
          component={WriteScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <IconWrite name="write" color={color} size={size} />
            ),
            headerShown: true,
            header: props => {
              return (
                <HeaderBottomTab
                  {...props}
                  onPressWallet={() =>
                    props.navigation.navigate('WalletScreen')
                  }
                  onPressNotification={() =>
                    props.navigation.navigate('NotificationScreen')
                  }
                />
              );
            },
          }}
        />
      )}
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileDetailStack}
        options={{
          tabBarIcon: ({color, size}) => {
            if (avatar !== null) {
              return (
                <Image
                  source={
                    avatar != null
                      ? {uri: avatar}
                      : require('../assets/images/no-avatar.png')
                  }
                  style={{
                    width: size,
                    height: size,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: color,
                  }}
                />
              );
            } else {
              return <IconAccount name="write" color={color} size={size} />;
            }
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;
