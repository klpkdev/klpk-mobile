import {GestureResponderEvent, Image, Text, TouchableOpacity, View} from 'react-native'
import Status from './Status'
import styles from './styles'

interface IProps {
  cover: string | null
  title: string
  synopsis: string
  status: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
}

const Write: React.FC<IProps> = ({cover, title, synopsis, status, onPress, ...props}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={cover != null ? {uri: cover} : require("../../../assets/images/placeholder.jpg") } style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={3}>{synopsis}</Text>
      <Status status={status} />
    </TouchableOpacity>
  )
}

export default Write
