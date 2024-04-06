import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import LandingScreen from '../screens/LandingScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import SplashScreen from '../screens/SplashScreen'
import {useAuth} from '../store'

const Stack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()

const Guest = () => {
  const isLoggedIn = useAuth(state => state.isLogin)

  return (
    <AuthStack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
    </AuthStack.Navigator>
  )
}

export default Guest
