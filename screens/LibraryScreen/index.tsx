import {useNavigation} from '@react-navigation/native';
import {useEffect, useMemo} from 'react';
import {FlatList, RefreshControl, SafeAreaView, Text, View} from 'react-native';
import {HomeCard} from '../../components/Card';
import SectionListLayout from '../../components/SectionListLayout';
import {useGetLibraries} from '../../services/libraries/query';
import styles from './styles';

const DATA = [
  {
    title: 'Sedang dibaca',
    type: 'vertical',
    data: [],
  },
  {
    title: 'Cerita dibeli',
    type: 'horizontal',
    data: [],
  },
];

const LibraryScreen = () => {
  const {
    data: dataReads,
    refetch: refetchReads,
    isLoading: isLoadingReads,
  } = useGetLibraries({limit: 1000, type: 'reads'});
  const {
    data: dataPurchases,
    refetch: refetchPurchases,
    isLoading: isLoadingPurchases,
  } = useGetLibraries({limit: 1000, type: 'purchases'});
  const navigation = useNavigation<any>();

  useEffect(() => {
    const result = DATA;
    if (dataReads?.data) {
      result[0].data = dataReads?.data?.map((item: any) => ({
        ...item,
        type: 'read',
      }));
    }
    if (dataPurchases?.data) {
      result[1].data = dataPurchases?.data;
    }
  }, [dataReads?.data, dataPurchases?.data]);

  return (
    <SectionListLayout
      sections={DATA}
      refreshControl={
        <RefreshControl
          refreshing={isLoadingReads || isLoadingPurchases}
          onRefresh={() => {
            refetchReads();
            refetchPurchases();
          }}
        />
      }
      listHeaderComponent={
        <>
          <Text style={styles.title}>Library</Text>
        </>
      }
      ListFooterComponent={<View style={styles.footer} />}
      renderItem={() => {
        return null;
      }}
      renderSectionHeader={({section}) => (
        <>
          <Text style={styles.titleSection}>{section?.title}</Text>
          <FlatList
            horizontal={section?.type === 'horizontal'}
            data={section.data}
            numColumns={section?.type === 'horizontal' ? undefined : 3}
            renderItem={({item}) => {
              return (
                <HomeCard
                  title={item?.title}
                  author={item?.author}
                  cover={item?.cover}
                  rating={item?.rating ? parseInt(item?.rating).toFixed(0) : ''}
                  price={item?.price}
                  onPress={() => {
                    navigation.navigate('DetailBookScreen', {
                      bookId: item?.id,
                      title: item?.title,
                    });
                  }}
                  progress={item?.type === 'read' ? true : false}
                  readProgress={item?.readProgress}
                />
              );
            }}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
      keyExtractor={(item, index) => item + index}
    />
  );
};

export default LibraryScreen;
