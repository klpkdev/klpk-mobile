import {View, Text, TouchableOpacity, GestureResponderEvent} from 'react-native'
import {IconCircleChevron} from '../Icons'
import styles from './styles'

interface IProps {
  title: string
  subtitle: string
  readMoreText: string
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  readMore?: boolean
}

const Title: React.FC<IProps> = ({title, subtitle, readMoreText, readMore, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {readMore ? (
        <TouchableOpacity style={styles.right} onPress={onPress}>
          <Text style={styles.readMoreText}>{readMoreText}</Text>
          <IconCircleChevron />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

export default Title
