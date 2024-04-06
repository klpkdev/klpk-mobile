import {FieldError, FieldErrorsImpl, Merge} from 'react-hook-form'
import {Text, TextInput, View, ViewStyle, TextInputProps} from 'react-native'
import styles from './styles'
import ModalSelector, {IOption} from 'react-native-modal-selector'

interface IProps extends TextInputProps {
  label: string
  icon?: React.ReactNode | undefined
  containerStyle?: ViewStyle
  isError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  placeholder?: string | undefined
  options: any
  onSelect: ((option: IOption) => void) | undefined
}

const Select: React.FC<IProps> = ({
  label,
  value,
  icon,
  containerStyle,
  options = [],
  isError,
  onSelect,
  placeholder,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.container_input, isError ? styles.isError : null]}>
        {icon}
        <ModalSelector data={options} style={styles.select} onChange={onSelect} cancelText="Cancel">
          <TextInput
            {...props}
            editable={false}
            style={styles.input}
            placeholderTextColor="#5A5B62"
            placeholder="Pilih Kategori"
            value={value}
          />
        </ModalSelector>
      </View>
    </View>
  )
}

export default Select
