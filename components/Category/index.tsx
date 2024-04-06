import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native'
import styles from './styles'

interface IProps {
  name: string
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

const Category: React.FC<IProps> = ({name, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

export default Category
