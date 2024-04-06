import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Platform, Text} from 'react-native';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import {
  IconAccount,
  IconMail,
  IconPassword,
  IconPhone,
} from '../../components/Icons';
import LinkNewMember from '../../components/LinkNewMember';
import {useRegister} from '../../services/auth/mutation';
import {GuestStackScreenProps} from '../../types/RootStackParamList';
import styles from './styles';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputControl from '../../components/InputControl';
import Toast from 'react-native-toast-message';

const schema = yup
  .object({
    fullName: yup.string().required('Nama Lengkap tidak boleh kosong'),
    username: yup
      .string()
      .required('Username tidak boleh kosong')
      .matches(
        /^(?=[a-zA-Z0-9._@]{6,32}$)(?!.*[_.@]{2})[^_.@].*[^_.@]$/,
        'Panjang username antara 6 - 32 dan hanya terdiri dari angka, huruf dan Symbol ( . atau _ atau @ )',
      )
      .min(6, 'Minimal 6 character')
      .max(32, 'Maximal 32 character'),
    isIos: yup.boolean(),
    phone: yup
      .string()
      .typeError('No Handphone tidak valid')
      // .required('No Handphone tidak boleh kosong')
      .matches(/(08[0-9]+)/, 'No Handphone tidak valid')
      .when('isIos', {
        is: true,
        then: yup.string().required('No Handphone tidak boleh kosong'),
      }),
    email: yup
      .string()
      .required('Email tidak boleh kosong')
      .email('Email tidak valid'),
    password: yup
      .string()
      .required('Password Tidak boleh kosong')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Password harus terdiri atas huruf kapital, huruf kecil, angka, symbol, dan minimal terdiri dari delapan karakter',
      )
      .min(8, 'Minimal 8 character'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password tidak sama'),
  })
  .required();

const RegisterScreen = () => {
  const navigation = useNavigation<GuestStackScreenProps>();
  const [isLoading, setIsloading] = useState(false);
  const mutation = useRegister();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      setValue('isIos', true);
    }
  }, []);

  const onSubmit = (data: any) => {
    setIsloading(true);
    mutation.mutate(data, {
      onSuccess: () => {
        setIsloading(false);
        Toast.show({
          type: 'success',
          text1: 'Pendaftaran Berhasil',
          text2: 'Silakan cek email anda',
          autoHide: false,
          onPress: () => {
            navigation.navigate('LoginScreen');
          },
        });
      },
      onError: (error: any) => {
        setIsloading(false);
        if (error?.response) {
          Toast.show({
            type: 'error',
            text1: 'Terjadi Kesalahan',
            text2: error?.response?.data?.errorMessage,
            autoHide: false,
            onPress: () => Toast.hide(),
          });
        }
      },
    });
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Daftar</Text>
      <InputControl
        control={control}
        errors={errors}
        feild="fullName"
        label="Nama Lengkap"
        icon={<IconAccount />}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="username"
        label="Username"
        icon={<IconAccount />}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="phone"
        label="No. Handphone"
        icon={<IconPhone />}
        inputProps={{keyboardType: 'number-pad'}}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="email"
        label="Email"
        icon={<IconMail />}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="password"
        label="Password"
        icon={<IconPassword />}
        inputProps={{secureTextEntry: true}}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="passwordConfirmation"
        label="Ulang Password"
        icon={<IconPassword />}
        inputProps={{secureTextEntry: true}}
      />
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        full={true}
        onPress={handleSubmit(onSubmit)}
        text="Daftar"
      />
      <LinkNewMember type="login" />
    </AuthLayout>
  );
};

export default RegisterScreen;
