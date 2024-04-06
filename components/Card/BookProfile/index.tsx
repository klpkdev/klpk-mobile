import {GestureResponderEvent, Image, Text, TouchableOpacity, View} from 'react-native'
import {IconCoin, IconStar} from '../../Icons'
import styles from './style'

interface IProps {
  cover: string | null
  title: string
  description: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
}

const BookProfile: React.FC<IProps> = ({cover, title, description, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={cover != null ? {uri: cover} : require("../../../assets/images/placeholder.jpg") } style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{description}</Text>
    </TouchableOpacity>
  )
}

export default BookProfile
