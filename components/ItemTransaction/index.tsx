import {GestureResponderEvent, Image, ImageSourcePropType, Text, TouchableOpacity, View} from 'react-native'
import styles from './styles'

interface IProps {
  image: ImageSourcePropType
  amount: string
  price: string
  selected?: boolean
  onPress: ((event: GestureResponderEvent) => void) | undefined
}

const ItemTransaction: React.FC<IProps> = ({onPress, image, amount, price, selected = false}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemTransaction, selected ? styles.itemTransactionSelected : null]}
    >
      <Image source={image} />
      <View style={styles.itemTransactionContent}>
        <Text style={[styles.titleItemTransaction, selected ? styles.titleItemTransactionSelected : null]}>{amount}</Text>
        <Text style={styles.dateItemTransaction}>{price}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemTransaction
