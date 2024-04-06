import {FieldError, FieldErrorsImpl, Merge} from 'react-hook-form';
import {
  Text,
  TextInput,
  View,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {useState} from 'react';
import {IconShowPassword, IconHidePassword} from '../Icons';

interface IProps extends TextInputProps {
  label?: string | undefined;
  icon?: React.ReactNode | undefined;
  containerStyle?: ViewStyle;
  containerInputStyle?: ViewStyle;
  isError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const Input: React.FC<IProps> = ({
  value,
  onChangeText,
  label,
  icon,
  containerStyle,
  isError,
  containerInputStyle,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(props.secureTextEntry);
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container_input,
          isError ? styles.isError : null,
          !icon ? styles.withoutIcon : null,
          containerInputStyle,
        ]}>
        {icon && <View style={styles.container_icon}>{icon}</View>}
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor="#5A5B62"
          placeholder={label}
          {...props}
          secureTextEntry={showPassword}
        />
        {props.secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}>
               <IconShowPassword style={{display: showPassword ? 'flex' : 'none'}} />
               <IconHidePassword style={{display: showPassword ? 'none' : 'flex'}} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
