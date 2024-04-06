import {Text, View} from 'react-native'
import styles from './style'

interface IProps {
  icon: React.ReactNode
  value: string
  label: string
}

const Item: React.FC<IProps> = ({icon, label, value}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemLabel}>{label}</Text>
      <View style={styles.itemContent}>
        {icon}
        <Text style={styles.itemText}>{value}</Text>
      </View>
    </View>
  )
}

export default Item
