import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Text, Image, TouchableOpacity, View, Platform} from 'react-native';
import Alert from '../../components/Alert';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import {IconAccount, IconPassword} from '../../components/Icons';
import LinkNewMember from '../../components/LinkNewMember';
import useGoogleSignIn from '../../hooks/useGoogleSignIn';
import {useLogin, useLoginGoogle} from '../../services/auth/mutation';
import styles from './styles';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputControl from '../../components/InputControl';
import {onError} from '../../utils/commons';
import {useAuth} from '../../store';
import {useNavigation} from '@react-navigation/native';

const schema = yup
  .object({
    username: yup.string().required('Username Tidak boleh kosong'),
    password: yup.string().required('Password Tidak boleh kosong'),
  })
  .required();

const LoginScreen = () => {
  const [isLoading, setIsloading] = useState(false);
  const {signIn, accessToken} = useGoogleSignIn();
  const navigation = useNavigation<any>();
  const auth = useAuth;
  const setLogin = useAuth(state => state.login);
  const mutation = useLogin();
  const mutationGoogle = useLoginGoogle();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    setIsloading(true);
    mutation.mutate(data, {
      onSuccess: (res: any) => {
        setIsloading(false);
        setLogin({
          isLogin: true,
          token: res?.data?.token as string,
          refreshToken: '',
          expirationDate: '',
        });
        auth.setState({
          isLogin: true,
          token: res?.data?.token as string,
          refreshToken: '',
          expirationDate: '',
        });
      },
      onError: error => {
        debugger;
        console.log('error :', error);
        onError(error);
        setIsloading(false);
      },
    });
  };

  useEffect(() => {
    if (accessToken) {
      setIsloading(true);
      const data = {token: accessToken as string} as any;
      mutationGoogle.mutate(data, {
        onSuccess: async (res: any) => {
          setIsloading(false);
          setLogin({
            isLogin: true,
            token: res?.data?.token as string,
            refreshToken: '',
            expirationDate: '',
          });
          auth.setState({
            isLogin: true,
            token: res?.data?.token as string,
            refreshToken: '',
            expirationDate: '',
          });
        },
        onError: error => {
          onError(error);
          setIsloading(false);
        },
      });
    }
  }, [accessToken]);

  return (
    <AuthLayout>
      <Text style={styles.title}>Masuk</Text>
      <InputControl
        control={control}
        errors={errors}
        feild="username"
        label="Email atau Username"
        icon={<IconAccount />}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="password"
        label="Password"
        icon={<IconPassword />}
        inputProps={{secureTextEntry: true}}
      />
      <View style={styles.forgot}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPasswordScreen');
          }}>
          <Text style={styles.forgot_text}>Lupa Password</Text>
        </TouchableOpacity>
      </View>
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        full={true}
        onPress={handleSubmit(onSubmit)}
        text="Masuk"
      />
      {Platform.OS !== 'ios' ? (
        <Button
          onPress={signIn}
          icon={
            <Image
              source={require('../../assets/images/google.png')}
              style={{marginRight: 10}}
            />
          }
          bgColor="black"
          full={true}
          text="Login dengan google"
        />
      ) : null}

      <LinkNewMember />
    </AuthLayout>
  );
};

export default LoginScreen;
