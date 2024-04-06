import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {TouchableOpacity} from 'react-native'
import {HeaderDetailBook} from '../components/Header'
import {IconSettings} from '../components/Icons'
import ProfileWritterScreen from '../screens/ProfileWritterScreen'
import ReadBookScreen from '../screens/ReadBookScreen'
import HomeStack from './home'
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'

const Stack = createNativeStackNavigator()
const LoggedInStack = createNativeStackNavigator()

const Protected = () => (
  <BottomSheetModalProvider>
    <LoggedInStack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="ReadBookScreen" component={ReadBookScreen} />
      <Stack.Screen name="ProfileWritterScreen" component={ProfileWritterScreen} />
    </LoggedInStack.Navigator>
  </BottomSheetModalProvider>
)

export default Protected
