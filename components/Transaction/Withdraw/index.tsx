import {View, Text} from 'react-native'
import {ITransaction} from '../../../interfaces/transactions'
import ItemTransaction from '../../ItemTransaction'
import styles from './style'

const image = require('../../../assets/images/money.png')

const Withdraw: React.FC<ITransaction> = ({items, onPress, selected}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Jumlah</Text>
      {items.map(item => (
        <ItemTransaction
          key={`item-${item.id}`}
          image={image}
          onPress={() => {
            onPress(item)
          }}
          selected={selected?.id === item.id}
          {...item}
        />
      ))}
    </View>
  )
}

export default Withdraw
