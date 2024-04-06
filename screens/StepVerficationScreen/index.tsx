import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import {IconAccount, IconBank, IconCard} from '../../components/Icons';
import {ProfileStackScreenProps} from '../../types/RootStackParamList';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputControl from '../../components/InputControl';
import Toast from 'react-native-toast-message';
import styles from './style';
import Select from '../../components/Select';
import {IOption} from 'react-native-modal-selector';
import InputTextError from '../../components/InputTextError';
import {
  useCreateVerification,
  useUpdateVerification,
} from '../../services/verifications/mutation';
import {useMe} from '../../services/current-user/query';
import {IVerificationPayload} from '../../interfaces/verification';

const listOptions = [
  {key: 'bca', label: 'Bank BCA'},
  {key: 'bri', label: 'Bank BRI'},
  {key: 'mandiri', label: 'Bank Mandiri'},
  {key: 'bni', label: 'Bank BNI'},
  {key: 'bsi', label: 'Bank BSI'},
];

const schema = yup
  .object({
    identityFullName: yup.string().required('Nama Lengkap tidak boleh kosong'),
    identityNumber: yup
      .string()
      .required('Username tidak boleh kosong')
      .min(6, 'Minimal 6 character'),
    bankName: yup.string().required('Bank harus tidak boleh kosong'),
    bankAccountNumber: yup.string().required('Nama Lengkap tidak boleh kosong'),
    city: yup.string().required('Kota tidak boleh kosong'),
  })
  .required();

const StepVerificationScreen = () => {
  const navigation = useNavigation<ProfileStackScreenProps>();
  const [selectedBank, setSelectedBank] = useState<IOption>({
    key: '',
    label: '',
  });
  const [idVerification, setIdVerification] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const {data} = useMe();
  const mutation = useCreateVerification();
  const updateMutation = useUpdateVerification();
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    setIsloading(true);
    if (idVerification !== '') {
      updateMutation.mutate(
        {
          id: idVerification,
          ...data,
        },
        {
          onSuccess: () => {
            setIsloading(false);
            navigation.navigate('ProfileScreen');
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
        },
      );
    } else {
      mutation.mutate(data, {
        onSuccess: () => {
          setIsloading(false);
          navigation.navigate('ProfileScreen');
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
    }
  };

  useEffect(() => {
    console.log('data: ', data?.data);
    if (data?.data?.verification) {
      setIdVerification(data?.data?.verification?.id);
      setValue('identityFullName', data?.data?.verification?.identityFullName);
      setValue('identityNumber', data?.data?.verification?.identityNumber);
      setValue('bankName', data?.data?.verification?.bankName);
      setValue('city', data?.data?.verification?.city);
      setValue(
        'bankAccountNumber',
        data?.data?.verification?.bankAccountNumber,
      );
      setValue('bankAccountName', data?.data?.verification?.bankAccountName);
    }
  }, [data?.data]);

  return (
    <AuthLayout>
      <InputControl
        control={control}
        errors={errors}
        feild="identityFullName"
        label="Nama Sesuai KTP"
        icon={<IconAccount />}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="identityNumber"
        label="No KTP"
        inputProps={{keyboardType: 'number-pad'}}
        icon={<IconAccount />}
      />
      {/* <Select
        label="Kategori"
        icon={<IconBank style={styles.icon} />}
        placeholder="Masukan Nama Bank"
        onSelect={item => {
          setSelectedBank(item)
          setValue('bankName', item.key)
        }}
        value={selectedBank.label}
        options={listOptions}
      /> */}
      {/* <InputTextError
        errors={errors}
        field={'bankAccountNumber'}
        message={errors['bankAccountNumber']?.message as string}
      /> */}
      <InputControl
        control={control}
        errors={errors}
        feild="bankName"
        label="Nama Bank"
        icon={<IconCard />}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="bankAccountNumber"
        inputProps={{keyboardType: 'number-pad'}}
        label="No. Rekening"
        icon={<IconCard />}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="bankAccountName"
        label="Nama Pemilik Rekening"
        icon={<IconAccount />}
      />
      <InputControl
        control={control}
        errors={errors}
        feild="city"
        label="Kota"
        icon={<IconCard />}
      />
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        full={true}
        onPress={handleSubmit(onSubmit)}
        text="Ajukan"
      />
    </AuthLayout>
  );
};

export default StepVerificationScreen;
