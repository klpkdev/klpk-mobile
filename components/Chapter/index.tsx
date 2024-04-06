import {GestureResponderEvent, Text, TouchableOpacity, View} from 'react-native'
import {IconEdit, IconLock} from '../Icons'
import styles from './styles'

interface IProps {
  number?: number
  title: string
  onEdit?: ((event: GestureResponderEvent) => void) | undefined
  icon?: React.ReactNode | undefined
  type?: 'button' | 'view'
  lock?: boolean
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

interface IPropsContainer {
  children: React.ReactNode
  type: 'button' | 'view'
  onPress?: ((event: GestureResponderEvent) => void) | undefined
}

const Chapter: React.FC<IProps> = ({number, title, onEdit, icon, type = 'view', onPress, lock = false}) => {
  return (
    <ChapterContainer type={type} onPress={onPress}>
      <View style={styles.number}>{icon ? icon : <Text style={styles.numberText}>{number}</Text>}</View>
      <Text style={styles.title}>{title}</Text>
      {onEdit ? (
        <TouchableOpacity onPress={onEdit}>
          <IconEdit />
        </TouchableOpacity>
      ) : null}
      {lock ? <IconLock /> : null}
    </ChapterContainer>
  )
}

const ChapterContainer: React.FC<IPropsContainer> = ({type, onPress, children}) => {
  if (type === 'view') {
    return <View style={styles.container}>{children}</View>
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default Chapter
