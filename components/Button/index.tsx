import {ReactNode} from 'react'
import {Text, TouchableOpacityProps, ActivityIndicator, TouchableOpacity} from 'react-native'
import styles from './styles'

interface IProps extends TouchableOpacityProps {
  text: string
  full?: boolean
  isLoading?: boolean
  bgColor?: 'yellow' | 'black' | 'grey' | 'red' | 'blue'
  outline?: boolean
  icon?: ReactNode
}

const Button: React.FC<IProps> = ({
  full,
  text,
  isLoading = false,
  bgColor = 'yellow',
  outline = false,
  icon,
  ...props
}: IProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        full ? styles.containerFull : styles.container,
        styles[bgColor as keyof object],
        outline ? styles.outline : null,
        props.disabled ? styles.disabled : null,
        props.style,
      ]}
    >
      {icon}
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text
          style={[
            styles.text,
            props.disabled ? styles.textDisabled : null,
            ['black', 'red', 'blue'].includes(bgColor) ? {color: '#fff'} : null,
            outline ? styles[`textOutline${bgColor}` as keyof object] : null,
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default Button
