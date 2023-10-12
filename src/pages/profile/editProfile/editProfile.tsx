import s from './editProfile.module.scss'

import { Button, ControlledTextfield } from '@/components'
import { EditProfileValues, useEditProfile } from '@/pages'

type EditProfileProps = {
  onSave: (data: EditProfileValues) => void
  initialData?: EditProfileValues
}

export const EditProfile: React.FC<EditProfileProps> = ({
  onSave,
  initialData,
}: EditProfileProps) => {
  const { control, handleSubmit } = useEditProfile(initialData)

  return (
    <form className={s.form}>
      <ControlledTextfield className={s.input} name="name" control={control} label="Nickname" />
      <Button
        type="submit"
        onClick={e => {
          e.preventDefault()
          handleSubmit(onSave)()
        }}
        fullWidth
      >
        Save Changes
      </Button>
    </form>
  )
}
