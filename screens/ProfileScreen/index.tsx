import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo, useState} from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import {BookProfileCard, HomeCard} from '../../components/Card';
import FlatListLayout from '../../components/FlatListLayout';
import {IconVerified} from '../../components/Icons';
import {useMe} from '../../services/current-user/query';
import {useAuth} from '../../store';
import {ProfileStackScreenProps} from '../../types/RootStackParamList';
import {checkByteSize, formatNumberWithK} from '../../utils/commons';
import styles from './styles';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {
  useUpdateMyAvatar,
  useUpdateMyCover,
} from '../../services/current-user/mutation';
import Toast from 'react-native-toast-message';
import {useGetLibraries} from '../../services/libraries/query';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {formatBytes, alertError} from '../../utils/commons';

type RootStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  StepVerficationScreen: undefined;
  FollowScreen: {userId: string};
  FollowerScreen: {userId: string};
  DetailBookScreen: {bookId: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;
type ProfileScreenPropRoute = Props['route'];
type ProfileScreenPropNavigation = Props['navigation'];

const ProfileScreen = () => {
  const {data, isLoading, refetch} = useMe();
  const logout = useAuth(state => state.logout);
  const token = useAuth(state => state.token);
  const [result, setResult] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();
  const [resultCover, setResultCover] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();
  const navigation = useNavigation<ProfileScreenPropNavigation>();
  const mutation = useUpdateMyAvatar();
  const mutationCover = useUpdateMyCover();
  const {data: libraries, refetch: refetchLibaries} = useGetLibraries({
    type: 'reads',
    limit: 10,
  });

  const avatar = useMemo(() => {
    if (data?.data?.photos) {
      const temp = data?.data?.photos.filter(
        (item: {type: string}) => item.type === 'avatar',
      );
      if (temp.length > 0) {
        return temp[0].url;
      }
      return null;
    } else {
      return null;
    }
  }, [data?.data]);

  const headerCover = useMemo(() => {
    if (data?.data?.photos) {
      const temp = data?.data?.photos.filter(
        (item: {type: string}) => item.type === 'cover',
      );
      if (temp.length > 0) {
        return temp[0].url;
      }
      return null;
    } else {
      return null;
    }
  }, [data?.data]);

  const verified = useMemo(() => {
    if (data?.data) {
      return data?.data?.verified;
    } else {
      return false;
    }
  }, [data?.data]);

  const handleFileUpload = async () => {
    DocumentPicker.pick({
      type: types.images,
    })
      .then(data => {
        if (checkByteSize(data?.[0]?.size as number)) {
          alertError('File terlalu besar. Maksimal ukuran file hanya 2MB');
        } else {
          setResult(data);
        }
      })
      .catch(handleError);
  };

  const handleFileUploadCover = async () => {
    DocumentPicker.pick({
      type: types.images,
    })
      .then(data => {
        if (checkByteSize(data?.[0]?.size as number)) {
          alertError('File terlalu besar. Maksimal ukuran file hanya 2MB');
        } else {
          setResultCover(data);
        }
      })
      .catch(handleError);
  };

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const renderImage = () => {
    if (result) {
      if (result[0 as keyof object]['uri']) {
        return (
          <Image
            source={{uri: result[0 as keyof object]['uri']}}
            style={styles.imageProfile}
          />
        );
      } else {
        return (
          <Image
            source={require('../../assets/images/no-avatar.png')}
            style={styles.placeholderImage}
          />
        );
      }
    } else {
      if (avatar) {
        return <Image source={{uri: avatar}} style={styles.imageProfile} />;
      } else {
        return (
          <Image
            source={require('../../assets/images/no-avatar.png')}
            style={styles.placeholderImage}
          />
        );
      }
    }
  };

  const renderImageCover = () => {
    if (resultCover) {
      if (resultCover[0 as keyof object]['uri']) {
        return (
          <Image
            source={{uri: resultCover[0 as keyof object]['uri']}}
            style={styles.headerCover}
          />
        );
      } else {
        return <View style={styles.placeholderImageCover} />;
      }
    } else {
      if (avatar) {
        return <Image source={{uri: headerCover}} style={styles.headerCover} />;
      } else {
        return <View style={styles.placeholderImageCover} />;
      }
    }
  };

  useEffect(() => {
    if (result) {
      const tempFile = result[0 as keyof object] as any;
      const dataSend = new FormData();
      dataSend.append('file', {
        filename: tempFile?.name,
        name: tempFile?.name,
        type: tempFile?.type,
        uri: tempFile?.uri,
      });
      mutation.mutate(
        {file: dataSend},
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: 'Berhasil',
              text2: 'Berhasil Mengubah Photo Profile',
              autoHide: false,
              onPress: () => Toast.hide(),
            });
          },
          onError: (error: any) => {
            if (error?.response) {
              Toast.show({
                type: 'error',
                text1: 'Terjadi Kesalahan',
                text2: error?.response?.data?.errorMessage,
                autoHide: false,
                onPress: () => Toast.hide(),
              });
            }
            setResult(null);
          },
        },
      );
    }
  }, [result]);

  useEffect(() => {
    if (resultCover) {
      const tempFileCover = resultCover[0 as keyof object] as any;
      const dataSendCover = new FormData();
      dataSendCover.append('file', {
        filename: tempFileCover?.name,
        name: tempFileCover?.name,
        type: tempFileCover?.type,
        uri: tempFileCover?.uri,
      });
      mutationCover.mutate(
        {file: dataSendCover},
        {
          onSuccess: () => {
            Toast.show({
              type: 'success',
              text1: 'Berhasil',
              text2: 'Berhasil Mengubah Cover Profile',
              autoHide: false,
              onPress: () => Toast.hide(),
            });
          },
          onError: (error: any) => {
            if (error?.response) {
              Toast.show({
                type: 'error',
                text1: 'Terjadi Kesalahan',
                text2: error?.response?.data?.errorMessage,
                autoHide: false,
                onPress: () => Toast.hide(),
              });
            }
            setResultCover(null);
          },
        },
      );
    }
  }, [resultCover]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
      refetchLibaries();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <FlatListLayout
      background={false}
      refreshing={isLoading || mutation.isLoading || mutationCover.isLoading}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            refetch();
            refetchLibaries();
          }}
        />
      }
      style={styles.container}
      columnWrapperStyle={styles.columnWrapper}
      listHeaderComponent={
        <View>
          <View>
            <TouchableOpacity onPress={handleFileUploadCover}>
              {renderImageCover()}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFileUpload}>
              {renderImage()}
            </TouchableOpacity>
          </View>
          <View style={styles.containerContent}>
            <View style={styles.nameProfile}>
              <Text style={styles.textNameProfile}>{data?.data?.fullName}</Text>
              {verified ? <IconVerified /> : null}
            </View>
            <Text style={styles.username}>{data?.data?.username}</Text>
            <View style={styles.containerButton}>
              <Button
                text="Edit Profil"
                onPress={() => navigation.navigate('EditProfileScreen')}
                outline={true}
                style={{paddingHorizontal: 50, paddingVertical: 8}}
              />
              {verified ? (
                <Button
                  text={`Edit No Rekening`}
                  onPress={() => navigation.navigate('StepVerficationScreen')}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    marginLeft: 10,
                  }}
                />
              ) : (
                <Button
                  text={`${
                    data?.data?.verification?.status === 'pending'
                      ? 'Menunggu Review'
                      : 'Aktifkan Verifikasi ✓'
                  }`}
                  onPress={() => navigation.navigate('StepVerficationScreen')}
                  disabled={
                    data?.data?.verification?.status === 'pending'
                      ? true
                      : false
                  }
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                    marginLeft: 10,
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.textCount}>{data?.data?.booksCount}</Text>
              <Text style={styles.textButton}>Buku</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('FollowScreen', {userId: data?.data?.id});
              }}>
              <Text style={styles.textCount}>
                {formatNumberWithK(data?.data?.followersCount)}
              </Text>
              <Text style={styles.textButton}>Pengikut</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('FollowerScreen', {userId: data?.data?.id});
              }}>
              <Text style={styles.textCount}>
                {formatNumberWithK(data?.data?.followingsCount)}
              </Text>
              <Text style={styles.textButton}>Mengikuti</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerTitleRead}>
            <Text style={styles.titleRead}>Bacaan Saya</Text>
          </View>
        </View>
      }
      data={libraries?.data}
      ListFooterComponent={
        <View style={styles.footer}>
          <Button
            text="Keluar"
            onPress={() => logout()}
            bgColor="red"
            full={false}
            style={{paddingHorizontal: 50}}
          />
        </View>
      }
      renderItem={(item: any) => {
        return (
          <BookProfileCard
            title={item.item.title}
            description={item.item.description}
            cover={item.item.cover}
            onPress={() => {
              navigation.navigate('DetailBookScreen', {bookId: item.item.id});
            }}
          />
        );
      }}
    />
  );
};

export default ProfileScreen;
