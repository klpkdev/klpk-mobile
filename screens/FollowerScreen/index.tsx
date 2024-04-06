import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FollowCard} from '../../components/Card';
import FlatListLayout from '../../components/FlatListLayout';
import {useFollow, useUnFollow} from '../../services/follow/mutation';
import {useGetFollowing} from '../../services/profiles/query';
import {ProfileStackParamList} from '../../types/RootStackParamList';
import {alertError} from '../../utils/commons';
import styles from './style';

type RootStackParamList = {
  FollowerScreen: {userId: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'FollowerScreen'>;
type FollowerScreenPropRoute = Props['route'];

const FollowerScreen = () => {
  const {params} = useRoute<FollowerScreenPropRoute>();

  const {data, refetch} = useGetFollowing(params?.userId);
  const follow = useFollow();
  const unFollow = useUnFollow();

  const handleFollow = (data: any) => {
    if (data?.following) {
      unFollow.mutate(data?.id, {
        onSuccess: () => {
          refetch();
        },
        onError: () => {
          alertError('Terjadi Kesalahan saat follow');
        },
      });
    } else {
      follow.mutate(data?.id, {
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
      numColumns={1}
      style={styles.container}
      data={data?.data}
      renderItem={(item: any) => {
        return (
          <FollowCard
            photo={item?.item?.photos[0]?.url}
            name={item?.item?.fullName}
            following={item?.item?.following}
            onPress={() => handleFollow(item?.item)}
          />
        );
      }}
    />
  );
};

export default FollowerScreen;
