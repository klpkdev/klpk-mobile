import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconCoin, IconStar} from '../../Icons';
import styles from './styles';

interface IProps {
  cover: string | null;
  title: string;
  author: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  rating?: string;
  price?: number | undefined;
  progress?: boolean;
  readProgress?: number;
}

const Home: React.FC<IProps> = ({
  cover,
  title,
  author,
  onPress,
  rating,
  price,
  progress = false,
  readProgress = 0,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {rating ? (
        <View style={styles.rating}>
          <IconStar width={11} height={11} color="#AF7F3E" />
          <Text style={styles.textRating}>{rating}</Text>
        </View>
      ) : null}
      <Image
        source={
          cover != null
            ? {uri: cover}
            : require('../../../assets/images/placeholder.jpg')
        }
        style={styles.image}
      />
      {progress ? (
        <View style={styles.containerProgress}>
          <Text
            style={[
              styles.textProgress,
              {backgroundColor: readProgress === 100 ? '#00C008' : '#0A84FF'},
            ]}>
            {readProgress === 100 ? 'Selesai' : 'Belum Selesai'}
          </Text>
        </View>
      ) : null}
      {progress ? (
        <View style={styles.containerProgressBar}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${readProgress}%`,
                backgroundColor: readProgress === 100 ? '#00C008' : '#0A84FF',
              },
            ]}
          />
        </View>
      ) : null}
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.title}>{title}</Text>
      {price ? (
        <View style={styles.coin}>
          <IconCoin />
          <Text style={styles.textCoin}>{price} koin</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default Home;
