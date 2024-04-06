import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Text} from 'react-native';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import {IconAccount} from '../../components/Icons';
import {useResetPassword} from '../../services/auth/mutation';

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputControl from '../../components/InputControl';
import {onError, alertSuccess} from '../../utils/commons';
import styles from './styles';
import LinkNewMember from '../../components/LinkNewMember';

const schema = yup
  .object({
    username: yup.string().required('Email Tidak boleh kosong'),
  })
  .required();

const ForgotPasswordScreen = () => {
  const [isLoading, setIsloading] = useState(false);
  const mutationResetPassword = useResetPassword();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    setIsloading(true);
    mutationResetPassword.mutate(data, {
      onSuccess: (res: any) => {
        setIsloading(false);
        alertSuccess(
          'Berhasil mengirim permintaan ubah password. Silahkan cek email untuk ubah pasword.',
        );
      },
      onError: error => {
        onError(error);
        setIsloading(false);
      },
    });
  };

  return (
    <AuthLayout>
      <Text style={styles.title}>Lupa Password</Text>
      <InputControl
        control={control}
        errors={errors}
        feild="username"
        label="Email"
        icon={<IconAccount />}
      />
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        full={true}
        onPress={handleSubmit(onSubmit)}
        text="Kirim Reset Link"
      />
      <LinkNewMember type="login" />
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;
