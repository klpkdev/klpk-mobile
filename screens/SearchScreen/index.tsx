import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RefreshControl, Text, TextInput, View} from 'react-native';
import {CategoryCard} from '../../components/Card';
import FlatListLayout from '../../components/FlatListLayout';
import {useGetInfinitePublicBook} from '../../services/my-books/query';
import styles from './style';
import {useGetPricing} from '../../services/settings/query';
import Input from '../../components/Input';
import {IconEmpty, IconSearch} from '../../components/Icons';
import {useDebounce} from '@uidotdev/usehooks';
import {useState} from 'react';
import LoadingInfinity from '../../components/LoadingInfinity';

type RootStackParamList = {
  SearchScreen: {text: string};
  DetailBookScreen: {bookId: string; title: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'SearchScreen'>;
type SearchScreenPropNavigation = Props['navigation'];
type SearchScreenPropRoute = Props['route'];

const EmptyList = () => {
  return (
    <View style={styles.containerEmpty}>
      <IconEmpty />
      <Text style={styles.textEmpty}>
        Maaf! kami tidak menemukan yang ada cari
      </Text>
    </View>
  );
};

const SearchScreen = () => {
  const {params} = useRoute<SearchScreenPropRoute>();
  const [searchText, setSearchText] = useState(params?.text);
  const navigation = useNavigation<SearchScreenPropNavigation>();
  const {data: dataSetting} = useGetPricing();
  const debouncedSearchText = useDebounce(searchText, 500);
  const {
    data: infinitBooks,
    fetchNextPage,
    hasNextPage,
    refetch: refetchInfinityBooks,
    isLoading: loadingBooks,
  } = useGetInfinitePublicBook({
    params: {limit: 9, search: debouncedSearchText},
    pageParam: 2,
  });

  return (
    <>
      <View style={styles.inputSearch}>
        <Input
          autoFocus={true}
          style={{padding: 10, color: 'white'}}
          containerInputStyle={{backgroundColor: '#000'}}
          placeholder="Search"
          onChangeText={text => setSearchText(text)}
          icon={<IconSearch />}
          value={searchText}
        />
      </View>
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
        ListEmptyComponent={<EmptyList />}
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
                item?.item?.rating
                  ? parseInt(item?.item?.rating).toFixed(1)
                  : ''
              }
              description={item?.item?.synopsis}
              price={item?.item?.price}
            />
          );
        }}
      />
    </>
  );
};

export default SearchScreen;
