import {CompositeNavigationProp, NavigatorScreenParams} from '@react-navigation/native'
import {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack'

export type RootStackParamList = {
  ProtectedStack: NavigatorScreenParams<ProtectedStackParamList>
  GuestStack: NavigatorScreenParams<GuestStackParamList>
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>

export type ProtectedStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>
  ReadBookScreen: {chapterId?: string; synopsis?: string; bookId?: string, allChapter?: []}
}

export type ProtectedStackScreenProps = CompositeNavigationProp<
  NativeStackNavigationProp<ProtectedStackParamList, 'HomeStack'>,
  NativeStackNavigationProp<ProtectedStackParamList>
>

export type GuestStackParamList = {
  SplashScreen: undefined
  LandingScreen: undefined
  LoginScreen: undefined
  RegisterScreen: undefined
}

export type GuestStackScreenProps = CompositeNavigationProp<
  NativeStackNavigationProp<GuestStackParamList, 'SplashScreen'>,
  NativeStackNavigationProp<GuestStackParamList>
>

export type ProfileStackParamList = {
  ProfileScreen: undefined
  EditProfileScreen: undefined
  StepVerficationScreen: undefined
  FollowScreen: {userId: string; pageRef?: string}
  FollowerScreen: {userId: string; pageRef?: string}
}

export type ProfileStackScreenProps = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileStackParamList, 'ProfileScreen'>,
  NativeStackNavigationProp<ProfileStackParamList>
>

export type HomeStackParamList = {
  HomeScreen: undefined
  DetailBookScreen: {bookId: string}
  ProfileWritterScreen: undefined
  CategoryScreen: undefined
  ProfileAuthorScreen: {userId: string; pageRef?: string}
}

export type HomeStackScreenProps = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>,
  NativeStackNavigationProp<HomeStackParamList>
>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
