import {useNavigation} from '@react-navigation/native'
import {Text, TouchableOpacity, View} from 'react-native'
import {RegisterScreenProp} from '../../types/RootStackParamList'
import styles from './styles'

interface IProps {
  type?: 'login' | 'register'
}

const LinkNewMember: React.FC<IProps> = ({type = 'register'}) => {
  const navigation = useNavigation<RegisterScreenProp>()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{type === 'login' ? 'Sudah punya akun?' : 'Pengguna baru?'}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(type === 'login' ? 'LoginScreen' : 'RegisterScreen')}>
        <Text style={styles.link}>{type === 'login' ? 'Masuk' : 'Daftar'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LinkNewMember
