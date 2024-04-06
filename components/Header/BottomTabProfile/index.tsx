import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconArrowLeft} from '../../Icons';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps extends BottomTabHeaderProps {
  onBack?: ((event: GestureResponderEvent) => void) | undefined;
  title?: string | undefined;
  right?: React.ReactNode | undefined;
}

const BottomTabProfile: React.FC<IProps> = ({onBack, title, right}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: insets.top + styles.container.paddingTop}]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={onBack}>
          <IconArrowLeft />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

export default BottomTabProfile;
