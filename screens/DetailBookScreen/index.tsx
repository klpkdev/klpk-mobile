import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {format, parseISO} from 'date-fns';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ScrollView,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import AuthLayout from '../../components/AuthLayout';
import Chapter from '../../components/Chapter';
import Toast from 'react-native-toast-message';
import {
  IconCalendar,
  IconCategory,
  IconChart,
  IconEye,
  IconMultipleAccount,
  IconReadBook,
  IconSmallBook,
  IconSynopsis,
} from '../../components/Icons';
import Rating from '../../components/Rating';
import {
  useBookRating,
  useBookSubscription,
} from '../../services/my-books/mutation';
import {
  usePublicBookDetail,
  usePublicBooksRating,
} from '../../services/my-books/query';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import {onError} from '../../utils/commons';
import RenderHTML from 'react-native-render-html';
import ScreenGuardModule from 'react-native-screenguard';
import Input from '../../components/Input';
import {useAuth} from '../../store';
import {useMe} from '../../services/current-user/query';
import FlatListLayout from '../../components/FlatListLayout';

interface IAllChapter {
  id: string;
  name: string;
  accessible: boolean;
  subscribeToAccess: boolean;
}

type RootStackParamList = {
  DetailBookScreen: {bookId: string};
  ProfileAuthorScreen: {userId: string};
  ReadBookScreen: {
    title: string;
    bookId: string;
    synopsis?: string | undefined;
    chapterId?: string | undefined;
    allChapter?: IAllChapter[];
    accessible?: boolean;
  };
};

interface IComment {
  fullName: string;
  rated: number;
  review: string;
  userId: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'DetailBookScreen'>;
type DetailBookScreenPropRoute = Props['route'];
type DetailBookScreenPropNavigation = Props['navigation'];

const DetailBookScreen = () => {
  const route = useRoute<DetailBookScreenPropRoute>();
  const navigation = useNavigation<DetailBookScreenPropNavigation>();
  const {width} = useWindowDimensions();
  const {data: dataUser} = useMe();

  const [buttonActive, setButtonActive] = useState('general');
  const [ratingNum, setRating] = useState(0);
  const [review, setReview] = useState('');
  const isFocused = useIsFocused();

  const bookSubscription = useBookSubscription();
  const bookRating = useBookRating();
  const {data, refetch} = usePublicBookDetail(route.params?.bookId);
  const {data: dataRating, refetch: refetchRating} = usePublicBooksRating(
    route?.params?.bookId,
  );

  useEffect(() => {
    if (isFocused) {
      refetch();
      refetchRating();
    }
  }, [isFocused]);

  useEffect(() => {
    if (data?.data?.rated) {
      setRating(data?.data?.rated);
    }
  }, [data?.data]);

  useEffect(() => {
    if (dataRating?.data) {
      const tmpReview = dataRating?.data?.find(
        (item: {userId: string}) => item.userId === dataUser?.data?.id,
      );
      setReview(tmpReview?.review);
    }
    // console.log('dataRating?.data', dataRating?.data);
  }, [dataRating?.data]);

  const handleReadBook = (
    chapterId: string,
    allChapter?: IAllChapter[],
    accessible?: boolean,
  ) => {
    if (chapterId === 'synopsis') {
      navigation.navigate('ReadBookScreen', {
        synopsis: data?.data?.synopsis,
        bookId: data?.data?.id,
        allChapter,
        title: data?.data?.title,
        accessible: true,
      });
    } else {
      navigation.navigate('ReadBookScreen', {
        chapterId: chapterId,
        synopsis: undefined,
        bookId: data?.data?.id,
        allChapter,
        title: data?.data?.title,
        accessible,
      });
    }
  };

  const handleButtonBottom = () => {
    if (data?.data?.subscribed) {
      handleReadBook('synopsis', data?.data?.chapters);
    } else {
      bookSubscription.mutate(
        {id: data?.data?.id},
        {
          onSuccess: () => {
            refetch();
            refetchRating();
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
          },
        },
      );
    }
  };

  const handleRating = (num: number) => {
    setRating(num);
    // bookRating.mutate(
    //   {bookId: data?.data?.id, body: {value: num}},
    //   {
    //     onSuccess: () => {
    //       refetch();
    //     },
    //     onError: onError,
    //   },
    // );
  };

  const handleSubmitRating = () => {
    bookRating.mutate(
      {bookId: data?.data?.id, body: {value: ratingNum, review: review}},
      {
        onSuccess: res => {
          refetch();
          refetchRating();
        },
        onError: onError,
      },
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ScreenGuardModule.unregister();
    });

    return unsubscribe;
  }, [navigation]);

  const renderComment: ListRenderItem<IComment> = ({item}) => (
    <View
      style={{
        paddingHorizontal: 5,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#726A64',
        backgroundColor: 'gray',
        borderRadius:5
      }}>
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 14,
          marginVertical: 5,
        }}>
        {item.fullName}
      </Text>
      <Rating
        count={item.rated}
        style={{marginHorizontal: -3, transform: [{scale: 0.4}]}}
        type="view"
      />
      <Text style={{color: 'white', marginVertical: 5, fontStyle:'italic'}}>{item.review}</Text>
    </View>
  );

  return (
    <>
      <AuthLayout style={{paddingHorizontal: 0}}>
        <ScrollView>
          <View style={styles.header}>
            <Image
              source={
                data?.data?.cover != null
                  ? {uri: data?.data?.cover}
                  : require('../../assets/images/placeholder.jpg')
              }
              style={styles.image}
            />
            <Text style={styles.title}>{data?.data?.title}</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProfileAuthorScreen', {
                  userId: data?.data?.writer?.userId,
                })
              }>
              <Text style={styles.author}>{data?.data?.writer?.fullName}</Text>
            </TouchableOpacity>

            <View style={styles.meta}>
              <View style={styles.iconText}>
                <IconEye />
                <Text style={styles.iconText_Text}>
                  {data?.data?.readersCount} Dibaca
                </Text>
              </View>
              <View style={styles.iconText}>
                <IconSmallBook />
                <Text style={styles.iconText_Text}>
                  {data?.data?.chapters?.length} Bab
                </Text>
              </View>
              <View style={styles.iconText}>
                <IconMultipleAccount />
                <Text style={styles.iconText_Text}>
                  {data?.data?.subscribersCount} Pelanggan
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={() => setButtonActive('general')}
                style={[
                  styles.buttonGroupButton,
                  buttonActive === 'general'
                    ? styles.buttonGroupButtonActive
                    : null,
                ]}>
                <Text style={styles.buttonGroupButtonText}>General</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setButtonActive('rating')}
                style={[
                  styles.buttonGroupButton,
                  buttonActive === 'rating'
                    ? styles.buttonGroupButtonActive
                    : null,
                ]}>
                <Text style={styles.buttonGroupButtonText}>Rating</Text>
              </TouchableOpacity>
            </View>
            {buttonActive === 'general' ? (
              <>
                <View style={styles.containerContent}>
                  <Text style={styles.titleSynopsis}>Sinopsis</Text>
                  <RenderHTML
                    contentWidth={width}
                    baseStyle={{color: '#fff'}}
                    source={{html: data?.data?.synopsis}}
                  />
                </View>
                <View style={styles.contentMeta}>
                  <View style={styles.itemMeta}>
                    <IconCalendar />
                    <View style={styles.itemMetaContent}>
                      <Text style={styles.itemMetaTitle}>Tanggal Terbit</Text>
                      {data?.data?.approvalDate ? (
                        <Text style={styles.itemMetaDesc}>
                          {format(
                            parseISO(data?.data?.approvalDate),
                            'dd LLLL yyyy',
                          )}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={styles.itemMeta}>
                    <IconCategory />
                    <View style={styles.itemMetaContent}>
                      <Text style={styles.itemMetaTitle}>Genre</Text>
                      <Text style={styles.itemMetaDesc}>
                        {data?.data?.category?.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.itemMeta}>
                    <IconChart />
                    <View style={styles.itemMetaContent}>
                      <Text style={styles.itemMetaTitle}>Progress</Text>
                      <Text style={styles.itemMetaDesc}>
                        {data?.data?.completed ? 'Selesai' : 'Belum Selesai'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.chapterList}>
                  <Text style={styles.chapterListTitle}>Bab</Text>
                  <Chapter
                    icon={<IconSynopsis />}
                    title="Sinopsis"
                    type="button"
                    onPress={() =>
                      handleReadBook('synopsis', data?.data?.chapters)
                    }
                  />
                  {data?.data?.chapters.map(
                    (
                      chapter: {id: number; name: string; accessible: boolean},
                      index: number,
                    ) => (
                      <Chapter
                        number={index + 1}
                        key={`chapter-${index}`}
                        title={chapter?.name}
                        lock={!chapter?.accessible}
                        type="button"
                        onPress={() =>
                          handleReadBook(
                            String(chapter.id),
                            data?.data?.chapters,
                            chapter?.accessible,
                          )
                        }
                      />
                    ),
                  )}
                </View>
              </>
            ) : (
              <>
                <View style={styles.containerRating}>
                  {/* <Text style={styles.titleRating}>Beri Rating Buku ini</Text> */}
                  <Rating
                    count={ratingNum}
                    type="button"
                    onPress={handleRating}
                  />
                  <Input
                    multiline={true}
                    containerStyle={styles.inputReviewContainer}
                    style={styles.inputReview}
                    value={review}
                    onChangeText={text => setReview(text)}
                  />
                  <TouchableOpacity
                    disabled={bookRating.isLoading}
                    style={styles.buttonReview}
                    onPress={handleSubmitRating}>
                    {bookRating.isLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.textButtonBottom}>Beri Ulasan</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <FlatListLayout
                  background={false}
                  data={dataRating?.data}
                  // refreshControl={
                  //   <RefreshControl
                  //     refreshing={loadingBooks}
                  //     onRefresh={() => refetchInfinityBooks()}
                  //   />
                  // }
                  numColumns={1}
                  style={styles.container}
                  // onEndReached={() => {
                  //   fetchNextPage();
                  // }}

                  renderItem={renderComment}
                />
              </>
            )}
          </View>
        </ScrollView>
      </AuthLayout>
      {buttonActive === 'general' ? (
        <TouchableOpacity
          style={styles.buttonBottom}
          onPress={handleButtonBottom}>
          <IconReadBook />
          <Text style={styles.textButtonBottom}>
            {data?.data?.subscribed ? 'Mulai Baca' : 'Subscribe'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default DetailBookScreen;
