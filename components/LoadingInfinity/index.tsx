import {Text, View} from 'react-native';
import styles from './styles';

interface IProps {
  text?: string;
}

const LoadingInfinity: React.FC<IProps> = ({text = 'Loading...'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLoading}>{text}</Text>
    </View>
  );
};

export default LoadingInfinity;
