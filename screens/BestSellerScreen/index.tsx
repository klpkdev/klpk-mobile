import {useNavigation, useRoute} from '@react-navigation/native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RefreshControl} from 'react-native'
import {CategoryCard} from '../../components/Card'
import FlatListLayout from '../../components/FlatListLayout'
import {useGetBestSeller} from '../../services/feed/query'
import styles from './style'

type RootStackParamList = {
  BestSellerScreen: {title: string; scope: 'daily' | 'monthly'}
  DetailBookScreen: {bookId: string; title: string}
}

type Props = NativeStackScreenProps<RootStackParamList, 'BestSellerScreen'>
type BestSellerScreenPropRoute = Props['route']
type BestSellerScreenPropNavigation = Props['navigation']

const BestSellerScreen = () => {
  const navigation = useNavigation<BestSellerScreenPropNavigation>()
  const {params} = useRoute<BestSellerScreenPropRoute>()
  const {data, isLoading, refetch} = useGetBestSeller({scope: params?.scope})
  return (
    <FlatListLayout
      background={false}
      data={data?.data}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />}
      numColumns={1}
      style={styles.container}
      renderItem={item => {
        return (
          <CategoryCard
            cover={item?.item?.cover}
            author={item?.item?.writer?.fullName}
            price={item?.item?.price}
            onPress={() => navigation.navigate('DetailBookScreen', {bookId: item?.item?.id, title: item?.item?.title})}
            title={item?.item?.title}
            rating={item?.item?.rating ? parseInt(item?.item?.rating).toFixed(0) : ""}
          />
        )
      }}
    />
  )
}

export default BestSellerScreen
