import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Text, View} from 'react-native'
import {HeaderDetailBook, HeaderNativeStack} from '../components/Header'
import BestSellerScreen from '../screens/BestSellerScreen'
import CategoryScreen from '../screens/CategoryScreen'
import CompletedStoryScreen from '../screens/CompletedStoryScreen'
import DetailBookScreen from '../screens/DetailBookScreen'
import HomeScreen from '../screens/HomeScreen'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileAuthorScreen from '../screens/ProfileAuthorScreen'
import SearchScreen from '../screens/SearchScreen'
import WalletScreen from '../screens/WalletScreen'

const Stack = createNativeStackNavigator()

const HomeDetailStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: props => {
            return (
              <HeaderNativeStack
                {...props}
                onPressWallet={() => props.navigation.navigate('WalletScreen')}
                onPressNotification={() => props.navigation.navigate('NotificationScreen')}
              />
            )
          },
        }}
      />
      <Stack.Screen
        name="DetailBookScreen"
        component={DetailBookScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} title={props.route.params?.['title' as keyof object]}  onBack={() => props.navigation.goBack()} />
          },
        }}
      />
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} title="Wallet" onBack={() => props.navigation.goBack()} />
          },
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} title="Notifikasi" onBack={() => props.navigation.goBack()} />
          },
        }}
      />
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} title={props.route.params?.['title' as keyof object]} onBack={() => props.navigation.goBack()} />
          },
        }}
      />
      <Stack.Screen
        name="ProfileAuthorScreen"
        component={ProfileAuthorScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} title="Penulis" onBack={() => props.navigation.goBack()} />
          },
        }}
      />
      <Stack.Screen
        name="BestSellerScreen"
        component={BestSellerScreen}
        options={{
          header: props => {
            return (
              <HeaderDetailBook
                {...props}
                title={props.route.params?.['title' as keyof object]}
                onBack={() => props.navigation.goBack()}
              />
            )
          },
        }}
      />
      <Stack.Screen
        name="CompletedStoryScreen"
        component={CompletedStoryScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} title="Completed Story" onBack={() => props.navigation.goBack()} />
          },
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} title="Search" onBack={() => props.navigation.goBack()} />
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeDetailStack
