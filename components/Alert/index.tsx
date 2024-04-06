import {Text, View} from 'react-native'
import styles from './styles'

interface IProps {
  message: string | undefined
  type: 'success' | 'error'
}

const Alert: React.FC<IProps> = ({message, type}) => {
  if (!message || message === '') {
    return null
  }
  return (
    <View style={styles[type]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default Alert
