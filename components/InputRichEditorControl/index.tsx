import {Control, Controller, FieldErrorsImpl, FieldValues} from 'react-hook-form'
import InputRichEditor from '../InputRichEditor'
import InputTextError from '../InputTextError'

interface IProps {
  control: Control<FieldValues, any>
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
  feild: string
  label: string
  placeholder?: string | undefined
}

const InputRichEditorControl: React.FC<IProps> = ({control, errors, feild, label, placeholder}) => {
  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <InputRichEditor
            isError={errors[feild]}
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
        name={feild}
      />
      <InputTextError errors={errors} field={feild} message={errors[feild]?.message as string} />
    </>
  )
}

export default InputRichEditorControl
