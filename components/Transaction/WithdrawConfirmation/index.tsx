import {View, Text} from 'react-native'
import {IconAccount, IconArrowRight, IconBank} from '../../Icons'
import Item from './Item'
import styles from './style'

interface IProps {
  name: string
  bankName: string
  bankNumber: string
  total: number
  coin: number
}

const WithdrawConfirmation: React.FC<IProps> = ({bankName, bankNumber, name, coin, total}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pastikan data benar</Text>
      <Item label="Nama Rekening" icon={<IconAccount />} value={name} />
      <Item label="Bank" icon={<IconBank />} value={bankName} />
      <Item label="Nomor Rekening" icon={<IconBank />} value={bankNumber} />
      <View style={styles.divider} />
      <Text style={styles.itemLabel}>Jumlah Withdraw</Text>
      <View style={styles.total}>
        <Text style={styles.textTotal}>Rp{total}</Text>
        <IconArrowRight />
        <Text style={styles.textTotal}>{coin} koin</Text>
      </View>
    </View>
  )
}

export default WithdrawConfirmation
