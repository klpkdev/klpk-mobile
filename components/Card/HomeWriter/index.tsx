import {GestureResponderEvent, Image, Text, TouchableOpacity, View} from 'react-native'
import styles from './style'

interface IProps {
  photo: string | null
  name: string
  title: string
  quote: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
}

const HomeWriter: React.FC<IProps> = ({photo, title, name, quote, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={photo != null ? {uri: photo} : require("../../../assets/images/no-avatar.png") } style={styles.image} />
      <Text style={styles.author}>{name}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.quote}>{quote}</Text>
    </TouchableOpacity>
  )
}

export default HomeWriter
