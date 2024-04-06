import {Text} from 'react-native'
import styles from './styles'

interface IProps {
  errors: any
  field: string
  message: string
}

const InputTextError: React.FC<IProps> = ({errors, field, message}) => {
  return errors[field as keyof object] ? <Text style={styles.text}>{message}</Text> : null
}

export default InputTextError
