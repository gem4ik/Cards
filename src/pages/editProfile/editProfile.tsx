import s from './editProfile.module.scss'
import { EditProfileValues, useEditProfile } from './useEditProfile'

import { Button } from '@/components/ui/button'
import { ControlledTextfield } from '@/components/ui/textfield/controlledTextfield.tsx'

type Props = {
  onSubmit: (data: EditProfileValues) => void
  initialValues?: EditProfileValues
}

export const EditProfile = ({ onSubmit, initialValues }: Props): JSX.Element => {
  const { control, handleSubmit } = useEditProfile(initialValues)

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledTextfield className={s.input} name="name" control={control} label="Nickmame" />
      <Button type="submit" fullWidth>
        Save Changes
      </Button>
    </form>
  )
}
