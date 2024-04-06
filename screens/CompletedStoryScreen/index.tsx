import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RefreshControl} from 'react-native';
import {CategoryCard} from '../../components/Card';
import FlatListLayout from '../../components/FlatListLayout';
import {useGetInfinitePublicBook} from '../../services/my-books/query';
import styles from './style';
import LoadingInfinity from '../../components/LoadingInfinity';

type RootStackParamList = {
  CompletedStoryScreen: undefined;
  DetailBookScreen: {bookId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'CompletedStoryScreen'>;
type CompletedStoryScreenPropNavigation = Props['navigation'];

const CompletedStoryScreen = () => {
  const navigation = useNavigation<CompletedStoryScreenPropNavigation>();
  const {
    data: infinitBooks,
    fetchNextPage,
    hasNextPage,
    refetch: refetchInfinityBooks,
    isLoading: loadingBooks,
  } = useGetInfinitePublicBook({
    params: {limit: 9, completed: true},
    pageParam: 2,
  });
  return (
    <FlatListLayout
      background={false}
      data={infinitBooks?.pages.flatMap(page => page.data)}
      refreshControl={
        <RefreshControl
          refreshing={loadingBooks}
          onRefresh={() => refetchInfinityBooks()}
        />
      }
      numColumns={1}
      style={styles.container}
      onEndReached={() => {
        fetchNextPage();
      }}
      ListFooterComponent={() => {
        const tmp = infinitBooks?.pages.flatMap(page => page.data);
        if (tmp) {
          return hasNextPage && tmp.length > 8 ? <LoadingInfinity /> : null;
        } else {
          return null;
        }
      }}
      renderItem={item => {
        return (
          <CategoryCard
            cover={item?.item?.cover}
            author={item?.item?.writer?.fullName}
            onPress={() =>
              navigation.navigate('DetailBookScreen', {
                bookId: item?.item?.id,
                title: item?.item?.title,
              })
            }
            title={item?.item?.title}
            rating={
              item?.item?.rating ? parseInt(item?.item?.rating).toFixed(0) : ''
            }
            description={item?.item?.synopsis.replace(/\&nbsp;/g, '')}
            price={item?.item?.price}
          />
        );
      }}
    />
  );
};

export default CompletedStoryScreen;
