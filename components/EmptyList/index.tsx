import {Text, View} from 'react-native';
import {IconEmpty} from '../Icons';
import styles from './style';

export default function EmptyList({text = "Maaf! kami tidak menemukan yang ada cari"}) {
  return (
    <View style={styles.containerEmpty}>
      <IconEmpty />
      <Text style={styles.textEmpty}>
        {text}
      </Text>
    </View>
  );
}
