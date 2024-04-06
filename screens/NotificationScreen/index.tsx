import {format, parse, parseISO} from 'date-fns';
import {SafeAreaView, Text, View, useWindowDimensions} from 'react-native';
import FlatListLayout from '../../components/FlatListLayout';
import {IconEmpty} from '../../components/Icons';
import {useNotification} from '../../contexts/notification';
import {
  useGetInfiniteNotification,
  useGetNotification,
} from '../../services/notification/query';
import styles from './style';
import {RefreshControl} from 'react-native-gesture-handler';
import LoadingInfinity from '../../components/LoadingInfinity';
import {createNotificationTitle} from '../../utils/commons';
import RenderHTML from 'react-native-render-html';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <IconEmpty />
      <Text style={styles.textEmpty}>Belum ada notifikasi!</Text>
    </View>
  );
};

const NotificationCard = ({item, width}: {width: number; item: any}) => {
  return (
    <View style={styles.item}>
      <View style={styles.item_header}>
        <Text style={styles.item_title}>
          {createNotificationTitle(item?.item?.type)}
        </Text>
        <Text style={styles.item_date}>
          {format(parseISO(item?.item?.creationDate), 'd MMM yyyy')}
        </Text>
      </View>

      <RenderHTML
        contentWidth={width}
        baseStyle={{color: '#fff'}}
        source={{html: item?.item?.content}}
      />
    </View>
  );
};

const NotificationScreen = () => {
  const {width} = useWindowDimensions();
  const {data, fetchNextPage, hasNextPage, refetch, isLoading} =
    useGetInfiniteNotification({
      params: {limit: 10},
      pageParam: 2,
    });

  return (
    <FlatListLayout
      background={false}
      style={{backgroundColor: '#000'}}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
      }
      data={data?.pages.flatMap(page => page.data)}
      renderItem={item => {
        return <NotificationCard item={item} width={width} />;
      }}
      numColumns={1}
      ListEmptyComponent={<EmptyList />}
      ListFooterComponent={() => {
        const tmp = data?.pages.flatMap(page => page.data);
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
      onEndReached={() => {
        fetchNextPage();
      }}
    />
  );
};

export default NotificationScreen;
