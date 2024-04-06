import {GestureResponderEvent, Text, View} from 'react-native'
import styles from './styles'
import Modal, {ModalProps} from 'react-native-modal'
import {ReactNode} from 'react'
import Button from '../Button'

interface IProps {
  title: string
  icon: ReactNode
  message: string
  buttonText: string
  buttonPress?: ((event: GestureResponderEvent) => void) | undefined
  isVisible: boolean
}

const MyModal: React.FC<IProps> = ({buttonText, buttonPress, icon, message, isVisible, title}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <Text style={styles.modalTitle}>{title}</Text>
          {icon}
          <Text style={styles.modalText}>{message}</Text>
          <Button text={buttonText} onPress={buttonPress} />
        </View>
      </View>
    </Modal>
  )
}

export default MyModal
