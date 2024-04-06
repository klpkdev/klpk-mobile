import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useMemo} from 'react';
import {
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import {BookProfileCard} from '../../components/Card';
import FlatListLayout from '../../components/FlatListLayout';
import {useFollow, useUnFollow} from '../../services/follow/mutation';
import {
  useGetInfinitePublicBook,
  usePublicBooks,
} from '../../services/my-books/query';
import {useGetProfileById} from '../../services/profiles/query';
import {alertError, formatNumberWithK} from '../../utils/commons';
import styles from './styles';
import LoadingInfinity from '../../components/LoadingInfinity';

type RootStackParamList = {
  EditProfileScreen: undefined;
  FollowScreen: {userId: string; pageRef: string};
  FollowerScreen: {userId: string; pageRef: string};
  DetailBookScreen: {bookId: string};
  ProfileAuthorScreen: {userId: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileAuthorScreen'>;
type ProfileAuthorScreenPropRoute = Props['route'];
type ProfileAuthorScreenPropNavigation = Props['navigation'];

const ProfileAuthorScreen = () => {
  const navigation = useNavigation<ProfileAuthorScreenPropNavigation>();
  const {params} = useRoute<ProfileAuthorScreenPropRoute>();
  const {data, isLoading, refetch, isError} = useGetProfileById(params?.userId);
  const {
    data: infinitBooks,
    fetchNextPage,
    hasNextPage,
    refetch: refetchInfinityBooks,
    isLoading: loadingBooks,
  } = useGetInfinitePublicBook({
    params: {limit: 9, userId: params?.userId},
    pageParam: 2,
  });
  const follow = useFollow();
  const unFollow = useUnFollow();

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

  const handleFollow = () => {
    if (data?.data?.following) {
      unFollow.mutate(params?.userId, {
        onSuccess: () => {
          refetch();
        },
        onError: () => {
          alertError('Terjadi Kesalahan saat follow');
        },
      });
    } else {
      follow.mutate(params?.userId, {
        onSuccess: () => {
          refetch();
        },
        onError: () => {
          alertError('Terjadi Kesalahan saat unfollow');
        },
      });
    }
  };

  return (
    <FlatListLayout
      background={false}
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            refetch();
            refetchInfinityBooks();
          }}
        />
      }
      onEndReached={() => {
        fetchNextPage();
      }}
      listHeaderComponent={
        !isLoading && !isError ? (
          <View>
            <View style={styles.header}>
              <View>
                {avatar ? (
                  <Image source={{uri: avatar}} style={styles.imageProfile} />
                ) : (
                  <View style={styles.placeholderImage} />
                )}
              </View>
              <View style={styles.containerContent}>
                <View style={styles.nameProfile}>
                  <Text style={styles.textNameProfile}>
                    {data?.data?.fullName}
                  </Text>
                </View>
                <Text style={styles.username}>{data?.data?.username}</Text>
                <View style={styles.containerButton}>
                  <Button
                    text={data?.data?.following ? 'Unfollow' : 'Follow'}
                    onPress={handleFollow}
                    bgColor={data?.data?.following ? 'grey' : 'blue'}
                    style={{paddingHorizontal: 50, paddingVertical: 8}}
                  />
                </View>
              </View>
            </View>
            <View style={styles.bioContainer}>
              <Text style={styles.textBio}>{data?.data?.bio}</Text>
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
                  navigation.navigate('FollowScreen', {
                    userId: data?.data?.id,
                    pageRef: 'ProfileAuthorScreen',
                  });
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
                  navigation.navigate('FollowerScreen', {
                    userId: data?.data?.id,
                    pageRef: 'ProfileAuthorScreen',
                  });
                }}>
                <Text style={styles.textCount}>
                  {formatNumberWithK(data?.data?.followingsCount)}
                </Text>
                <Text style={styles.textButton}>Mengikuti</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerTitleRead}>
              <Text style={styles.titleRead}>Buku</Text>
            </View>
          </View>
        ) : null
      }
      data={infinitBooks?.pages.flatMap(page => page.data)}
      ListFooterComponent={() => {
        const tmp = infinitBooks?.pages.flatMap(page => page.data);
        if (tmp) {
          return hasNextPage && tmp.length > 8 ? (
            <LoadingInfinity />
          ) : (
            <View style={styles.footer} />
          );
        } else {
          return <View style={styles.footer} />;
        }
      }}
      renderItem={(item: any) => {
        return (
          <BookProfileCard
            title={item.item.title}
            description={item.item.description}
            cover={item.item.cover}
            onPress={() => {
              navigation.navigate('DetailBookScreen', {bookId: item.item?.id});
            }}
          />
        );
      }}
    />
  );
};

export default ProfileAuthorScreen;
