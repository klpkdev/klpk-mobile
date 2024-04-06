import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNotification} from '../../../contexts/notification';
import {IconNotification, IconNotificatoinReady, IconWallet} from '../../Icons';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGetNotification} from '../../../services/notification/query';
import {useNavigation} from '@react-navigation/native';

interface IProps extends NativeStackHeaderProps {
  onPressNotification?: ((event: GestureResponderEvent) => void) | undefined;
  onPressWallet?: ((event: GestureResponderEvent) => void) | undefined;
}

const NativeStack: React.FC<IProps> = ({
  onPressNotification,
  onPressWallet,
}) => {
  const insets = useSafeAreaInsets();
  const {data, refetch} = useGetNotification();
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top + styles.container.paddingTop},
      ]}>
      <TouchableOpacity onPress={onPressWallet}>
        <IconWallet />
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/logoHeader.png')}
      />
      <TouchableOpacity onPress={onPressNotification}>
        <IconNotification
          style={{display: data?.data?.length > 1 || undefined ? 'flex' : 'none'}}
        />
        <IconNotificatoinReady
          style={{display: data?.data?.length < 1 ? 'flex' : 'none'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NativeStack;
