// import { Form } from 'react-hook-form'

import s from './editProfile.module.scss'

import { Button } from '@/components/ui/button'
import { ControlledTextfield } from '@/components/ui/textfield/controlledTextfield.tsx'
import { EditProfileValues, useEditProfile } from '@/pages/profile/editProfile/useEditProfile.ts'

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
    <form
      // control={control}
      className={s.form}
      onSubmit={e => {
        handleSubmit(onSave)()
        e.preventDefault()

        return false
      }}
    >
      <ControlledTextfield className={s.input} name="name" control={control} label="Nickname" />
      <Button
        type="submit"
        // onClick={e => {
        //   e.preventDefault()
        //   handleSubmit(onSave)()
        // }}
        fullWidth
      >
        Save Changes
      </Button>
    </form>
  )
}
