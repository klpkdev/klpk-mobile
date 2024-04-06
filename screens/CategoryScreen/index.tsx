import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RefreshControl} from 'react-native';
import {CategoryCard} from '../../components/Card';
import FlatListLayout from '../../components/FlatListLayout';
import {useGetInfinitePublicBook} from '../../services/my-books/query';
import styles from './style';
import EmptyList from '../../components/EmptyList';
import LoadingInfinity from '../../components/LoadingInfinity';

type RootStackParamList = {
  CategoryScreen: {id: string; title: string};
  DetailBookScreen: {bookId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'CategoryScreen'>;
type CategoryScreenPropNavigation = Props['navigation'];
type CategoryScreenPropRoute = Props['route'];

const CategoryScreen = () => {
  const {params} = useRoute<CategoryScreenPropRoute>();
  const navigation = useNavigation<CategoryScreenPropNavigation>();
  const {
    data: infinitBooks,
    fetchNextPage,
    hasNextPage,
    refetch: refetchInfinityBooks,
    isLoading: loadingBooks,
  } = useGetInfinitePublicBook({
    params: {limit: 9, category: params?.id},
    pageParam: 2,
  });
  return (
    <FlatListLayout
      background={false}
      refreshControl={
        <RefreshControl
          refreshing={loadingBooks}
          onRefresh={() => refetchInfinityBooks()}
        />
      }
      data={infinitBooks?.pages.flatMap(page => page.data)}
      numColumns={1}
      style={styles.container}
      ListEmptyComponent={
        <EmptyList text="Maaf! kami tidak menemukan buku dikategori ini" />
      }
      ListFooterComponent={() => {
        const tmp = infinitBooks?.pages.flatMap(page => page.data);
        if (tmp) {
          return hasNextPage && tmp.length > 8 ? <LoadingInfinity /> : null;
        } else {
          return null;
        }
      }}
      onEndReached={() => {
        fetchNextPage();
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
          />
        );
      }}
    />
  );
};

export default CategoryScreen;
