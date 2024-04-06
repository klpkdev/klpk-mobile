import {Text, View} from 'react-native'
import {IconChecked, IconDraft, IconTimer} from '../../Icons'
import styles from './styles'

interface IProps {
  status: string
}

const Status: React.FC<IProps> = ({status}) => {
  const renderIcon = () => {
    switch (status) {
      case 'pending':
        return (
          <View style={styles.containerStatus}>
            <IconDraft />
            <Text style={styles.statusText}>Pending</Text>
          </View>
        )
      case 'live':
        return (
          <View style={styles.containerStatus}>
            <IconChecked />
            <Text style={styles.statusText}>Live</Text>
          </View>
        )

      default:
        return (
          <View style={styles.containerStatus}>
            <IconDraft />
            <Text style={styles.statusText}>Draft</Text>
          </View>
        )
    }
  }
  return <View style={styles.status}>{renderIcon()}</View>
}

export default Status
