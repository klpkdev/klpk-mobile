import {ReactNode} from 'react'
import {Control, Controller, FieldErrorsImpl, FieldValues} from 'react-hook-form'
import {TextInputProps} from 'react-native'
import Input from '../Input'
import InputTextError from '../InputTextError'

interface IProps {
  icon?: ReactNode | undefined
  control: Control<FieldValues, any>
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
  feild: string
  label: string
  inputProps?: TextInputProps
}

const InputControl: React.FC<IProps> = ({icon, control, errors, feild, label, inputProps}) => {
  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Input
            isError={errors[feild]}
            label={label}
            value={value}
            onChangeText={onChange}
            icon={icon}
            {...inputProps}
          />
        )}
        name={feild}
      />
      <InputTextError errors={errors} field={feild} message={errors[feild]?.message as string} />
    </>
  )
}

export default InputControl
