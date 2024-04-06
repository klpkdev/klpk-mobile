import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {
  GestureResponderEvent,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconNotification, IconNotificatoinReady, IconWallet} from '../../Icons';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGetNotification} from '../../../services/notification/query';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

interface IProps extends BottomTabHeaderProps {
  onPressNotification?: ((event: GestureResponderEvent) => void) | undefined;
  onPressWallet?: ((event: GestureResponderEvent) => void) | undefined;
}

const BottomTab: React.FC<IProps> = ({onPressNotification, onPressWallet}) => {
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
          style={{display: data?.data?.length > 1 ? 'flex' : 'none'}}
        />
        <IconNotificatoinReady
          style={{display: data?.data?.length < 1 ? 'flex' : 'none'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;
