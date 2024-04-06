import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconArrowLeft} from '../../Icons';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps extends NativeStackHeaderProps {
  onBack?: ((event: GestureResponderEvent) => void) | undefined;
  title?: string | undefined;
  right?: React.ReactNode | undefined;
}

const DetailBook: React.FC<IProps> = ({onBack, title, right}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top + styles.container.paddingTop}]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={onBack}>
          <IconArrowLeft />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

export default DetailBook;
