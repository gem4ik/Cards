import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Textfield, TextfieldProps } from '@/components/ui/textfield/textfield.tsx'

type Props<T extends FieldValues> = Pick<UseControllerProps<T>, 'control' | 'name'> &
  Omit<TextfieldProps, 'onChange' | 'value' | 'id'>

export const ControlledTextfield = <T extends FieldValues>(props: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })

  return <Textfield {...props} {...field} error={error?.message}></Textfield>
}
