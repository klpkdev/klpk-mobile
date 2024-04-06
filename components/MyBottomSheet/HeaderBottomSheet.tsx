import {GestureResponderEvent, Text, TouchableOpacity, View} from 'react-native'
import styles from './styles'

interface IProps {
  left?: React.ReactNode
  right?: React.ReactNode
  title: string
  leftPress?: ((event: GestureResponderEvent) => void) | undefined
  rightPress?: ((event: GestureResponderEvent) => void) | undefined
}

const HeaderBottomSheet: React.FC<IProps> = ({title, left, right, rightPress, leftPress}) => {
  return (
    <View style={styles.bottomSheetHeader}>
      <TouchableOpacity style={styles.bottomSheetActionLeft} onPress={leftPress}>
        {left}
      </TouchableOpacity>
      <Text style={styles.bottomSheetHeaderTitle}>{title}</Text>
      <TouchableOpacity style={styles.bottomSheetActionRight} onPress={rightPress}>
        {right}
      </TouchableOpacity>
    </View>
  )
}

export default HeaderBottomSheet
