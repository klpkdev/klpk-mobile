import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {HeaderDetailBook, HeaderNativeStack} from '../components/Header'
import EditProfileScreen from '../screens/EditProfileScreen'
import FollowerScreen from '../screens/FollowerScreen'
import FollowScreen from '../screens/FollowScreen'
import ProfileScreen from '../screens/ProfileScreen'
import StepVerficationScreen from '../screens/StepVerficationScreen'

const Stack = createNativeStackNavigator()

const ProfileDetailStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} onBack={() => props.navigation.goBack()} title="Profile" />
          },
        }}
      />
      <Stack.Screen
        name="StepVerficationScreen"
        component={StepVerficationScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} onBack={() => props.navigation.goBack()} title="Step Verifikasi" />
          },
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          header: props => {
            return <HeaderDetailBook {...props} onBack={() => props.navigation.goBack()} title="Edit Profile" />
          },
        }}
      />
      <Stack.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={{
          header: (props: any) => {
            return (
              <HeaderDetailBook
                {...props}
                onBack={() => {
                  if (props?.route?.params?.pageRef) {
                    props.navigation.navigate(props?.route?.params?.pageRef, {userId: props?.route?.params?.userId})
                  } else {
                    props.navigation.goBack()
                  }
                }}
                title="Mengikuti"
              />
            )
          },
        }}
      />
      <Stack.Screen
        name="FollowScreen"
        component={FollowScreen}
        options={{
          header: (props: any) => {
            return <HeaderDetailBook {...props}  onBack={() => {
              if (props?.route?.params?.pageRef) {
                props.navigation.navigate(props?.route?.params?.pageRef, {userId: props?.route?.params?.userId})
              } else {
                props.navigation.goBack()
              }
            }} title="Pengikut" />
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default ProfileDetailStack
