import {useNavigation} from '@react-navigation/native';
import {Dimensions, FlatList, Image, RefreshControl, View} from 'react-native';
import {HomeCard, HomeWriterCard} from '../../components/Card';
import Category from '../../components/Category';
import {IconSearch} from '../../components/Icons';
import Input from '../../components/Input';
import SectionListLayout from '../../components/SectionListLayout';
import Title from '../../components/Title';
import {useCategories} from '../../services/categories/query';
import styles from './styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useMemo, useState} from 'react';
import {useGetBestSeller, useGetTopWriters} from '../../services/feed/query';
import {usePublicBooks} from '../../services/my-books/query';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useBanners} from '../../services/banners/query';
import {useGetPricing} from '../../services/settings/query';

type RootStackParamList = {
  CategoryScreen: {id: string; title: string};
  BestSellerScreen: {title: string; scope: 'daily' | 'monthly'};
  ProfileAuthorScreen: {userId: string};
  DetailBookScreen: {bookId: string; title: string};
  HomeScreen: undefined;
  CompletedStoryScreen: undefined;
  SearchScreen: {text: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
type HomeScreenPropNavigation = Props['navigation'];

const DATA = [
  {
    title: 'Today Best Sellers',
    subtitle: 'Based on Favorite Choose',
    allScreen: 'BestSellerScreen',
    all: true,
    data: [],
  },
  {
    title: 'Monthly Best Sellers',
    subtitle: 'Based on Favorite Choose',
    allScreen: 'BestSellerScreen',
    all: true,
    data: [],
  },
  {
    title: 'Writers of the Month',
    subtitle: 'Based on Favorite Choose',
    type: 'writer',
    all: false,
    data: [],
  },
  {
    title: 'Completed Story',
    subtitle: 'Buku yang bisa anda beli',
    allScreen: 'CompletedStoryScreen',
    type: 'completed-book',
    all: true,
    data: [],
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenPropNavigation>();
  const categories = useCategories();
  const {data: dataSetting} = useGetPricing();
  const {data: BSDaily, refetch: refetchDaily} = useGetBestSeller({
    page: 1,
    limit: 5,
    scope: 'daily',
  });
  const {
    data: BSMonthly,
    isLoading,
    refetch,
  } = useGetBestSeller({
    page: 1,
    limit: 5,
    scope: 'monthly',
  });
  const {data: TopWriters, refetch: refetchTopWriters} = useGetTopWriters({
    page: 1,
    limit: 5,
  });
  const {data: CompletedBook, refetch: refetchCompletedBook} = usePublicBooks({
    completed: true,
    limit: 5,
  });
  const {data: Banners, refetch: refetchBanner} = useBanners();
  const [activeDot, setActiveDot] = useState(0);
  const [textSearch, setTextSearch] = useState('');

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View key={`image-${index}`}>
        <Image
          source={{uri: item.image}}
          style={{width: '100%', height: 200}}
          resizeMode="contain"
        />
      </View>
    );
  };

  const currentData = useMemo(() => {
    const result = DATA;
    if (BSDaily?.data) {
      result[0].data = BSDaily?.data;
    }

    if (BSMonthly?.data) {
      result[1].data = BSMonthly?.data;
    }

    if (TopWriters?.data) {
      result[2].data = TopWriters?.data;
    }

    if (CompletedBook?.data) {
      result[3].data = CompletedBook?.data;
    }

    return result;
  }, [BSDaily?.data, BSMonthly?.data, TopWriters?.data, CompletedBook?.data]);

  const currentBanners = useMemo(() => {
    if (Banners?.data) {
      return Banners?.data?.map((item: {id: string; url: string}) => ({
        title: item.id,
        image: item.url,
      }));
    }

    return [];
  }, [Banners?.data]);

  return (
    <SectionListLayout
      sections={currentData}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            refetchDaily();
            refetch();
            refetchBanner();
            refetchCompletedBook();
            refetchTopWriters();
          }}
        />
      }
      listHeaderComponent={
        <>
          <View style={styles.header}>
            <View style={styles.inputSearch}>
              <Input
                style={{padding: 10, color: 'white', flex: 1}}
                placeholder="Search"
                onChangeText={text => setTextSearch(text)}
                icon={<IconSearch />}
                onFocus={() => {
                  navigation.navigate('SearchScreen', {text: ''});
                }}
              />
            </View>
            <View style={styles.carousel}>
              <Carousel
                data={currentBanners}
                autoplay={true}
                loop={true}
                renderItem={renderItem}
                autoplayInterval={3000}
                sliderWidth={Dimensions.get('screen').width}
                itemWidth={Dimensions.get('screen').width}
                onSnapToItem={index => setActiveDot(index)}
              />
              <Pagination
                dotsLength={currentBanners.length}
                activeDotIndex={activeDot}
                dotStyle={styles.dotStyle}
              />
            </View>
          </View>

          <FlatList
            data={categories.data?.data as any}
            horizontal
            style={{paddingHorizontal: 12, marginBottom: 40}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <Category
                name={item.name}
                onPress={() => {
                  navigation.navigate('CategoryScreen', {
                    id: item.id,
                    title: item.name,
                  });
                }}
              />
            )}
          />
        </>
      }
      stickySectionHeadersEnabled={false}
      ListFooterComponent={<View style={styles.footer} />}
      renderItem={() => {
        return null;
      }}
      renderSectionHeader={({section}) => (
        <>
          <Title
            title={section.title}
            subtitle={section.subtitle}
            readMoreText="Selengkapnya"
            onPress={() => {
              if (section.allScreen === 'BestSellerScreen') {
                navigation.navigate('BestSellerScreen', {
                  title: section.title,
                  scope: section.title.includes('Today') ? 'daily' : 'monthly',
                });
              } else {
                navigation.navigate('CompletedStoryScreen');
              }
            }}
            readMore={section.all}
          />
          <FlatList
            horizontal
            data={section.data}
            renderItem={({item}) => {
              switch (section.type) {
                case 'writer':
                  return (
                    <HomeWriterCard
                      title={item.fullName}
                      name={item.username}
                      photo={item.photos?.[0]?.url}
                      quote={item.bio}
                      onPress={() => {
                        navigation.navigate('ProfileAuthorScreen', {
                          userId: item?.userId,
                        });
                      }}
                    />
                  );

                default:
                  return (
                    <HomeCard
                      title={item.title}
                      author={item.author}
                      cover={item.cover}
                      rating={
                        item.rating
                          ? parseFloat(item?.rating).toFixed(1)
                          : undefined
                      }
                      price={item.price}
                      onPress={() => {
                        navigation.navigate('DetailBookScreen', {
                          bookId: item?.id,
                          title: item.title,
                        });
                      }}
                    />
                  );
              }
            }}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
      keyExtractor={(item, index) => item + index}
    />
  );
};

export default HomeScreen;
