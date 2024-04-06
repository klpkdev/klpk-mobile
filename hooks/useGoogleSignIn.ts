import {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';

const useGoogleSignIn = () => {
  const [userInfo, setUserInfo] = useState<User>();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '492987842318-ivsvpv1ed9dhajum93gm8qg42khm63b1.apps.googleusercontent.com',
      // iosClientId:
      //   'com.googleusercontent.apps.492987842318-t9afuekh4rsehmogpgl69i4306n1b3qe',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      setAccessToken(token.accessToken);
      setUserInfo(userInfo);
    } catch (error: any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('statusCodes.SIGN_IN_CANCELLED');
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('statusCodes.IN_PROGRESS');
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('statusCodes.PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        // some other error happened
        console.log('error?.code', error?.code);
      }
    }
  };

  return {signIn, userInfo, accessToken};
};

export default useGoogleSignIn;
