import {Alert, Text, View} from 'react-native';
import AuthLayout from '../../components/AuthLayout';
import InputControl from '../../components/InputControl';
import styles from './style';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {IconAccount, IconMail, IconPhone} from '../../components/Icons';
import Button from '../../components/Button';
import {useEffect, useState} from 'react';
import {
  useDeleteAccount,
  useUpdateMe,
} from '../../services/current-user/mutation';
import {useMe} from '../../services/current-user/query';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {ProfileStackScreenProps} from '../../types/RootStackParamList';
import {useAuth} from '../../store';

const schema = yup
  .object({
    fullName: yup.string().required('Nama Lengkap tidak boleh kosong'),
    email: yup.string().required('Email tidak boleh kosong'),
    username: yup
      .string()
      .required('Username harus tidak boleh kosong')
      .min(6, 'Minimal 6 character'),
    phone: yup.string().required('Phone Lengkap tidak boleh kosong'),
    bio: yup.string().nullable(true), //.required('Bio Lengkap tidak boleh kosong'),
  })
  .required();

const EditProfileScreen = () => {
  const logout = useAuth(state => state.logout);
  const navigation = useNavigation<ProfileStackScreenProps>();
  const [isLoading, setIsloading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useUpdateMe();
  const deleteAccount = useDeleteAccount();
  const {data} = useMe();

  const onSubmit = (data: any) => {
    setIsloading(true);
    mutation.mutate(data, {
      onSuccess: () => {
        setIsloading(false);
        Toast.show({
          type: 'success',
          text1: 'Berhasil',
          text2: 'Profile berhasil di update',
          autoHide: true,
          onPress: () => Toast.hide(),
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

  const actionDeleteAccount = () => {
    deleteAccount.mutate(
      {},
      {
        onSuccess: () => {
          logout();
        },
        onError: () => {
          Alert.alert('Maaf', 'Terjadi kesalahan, silakan ulangi lagi', [
            {
              text: 'Ok',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]);
        },
      },
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert('Perhatian', 'Apakah anda yakin akan menghapus akun anda?', [
      {
        text: 'Batal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Ya, Saya yakin', onPress: () => actionDeleteAccount()},
    ]);
  };

  useEffect(() => {
    if (data?.data) {
      setValue('fullName', data?.data?.fullName);
      setValue('bio', data?.data?.bio);
      setValue('username', data?.data?.username);
      setValue('phone', data?.data?.phone);
      setValue('email', data?.data?.email);
    }
  }, [data?.data]);

  return (
    <AuthLayout>
      <InputControl
        control={control}
        errors={errors}
        feild="fullName"
        label="Nama Lengkap"
        icon={<IconAccount />}
      />
      <InputControl control={control} errors={errors} feild="bio" label="Bio" />
      <InputControl
        control={control}
        errors={errors}
        feild="username"
        icon={<IconAccount />}
        label="Username"
      />
      <InputControl
        control={control}
        errors={errors}
        feild="phone"
        icon={<IconPhone />}
        label="No. Handphone"
      />
      <InputControl
        control={control}
        errors={errors}
        feild="email"
        label="Email"
        icon={<IconMail />}
      />
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        full={true}
        onPress={handleSubmit(onSubmit)}
        text="Simpan"
      />
      <Button
        disabled={isLoading}
        outline={true}
        isLoading={isLoading}
        full={true}
        onPress={handleDeleteAccount}
        text="Hapus Akun"
      />
    </AuthLayout>
  );
};

export default EditProfileScreen;
