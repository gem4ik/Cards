import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Textfield, TextfieldProps } from '@/components/ui/textfield/textfield.tsx'

type Props<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
} & Omit<TextfieldProps, 'onChange' | 'value' | 'id'>

export const ControlledTextfield = <TFieldValues extends FieldValues>(
  props: Props<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })

  return <Textfield {...props} {...field} error={error?.message}></Textfield>
}
