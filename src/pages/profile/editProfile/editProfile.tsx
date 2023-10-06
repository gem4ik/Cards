import Ava from './ava2.png'
import s from './editProfile.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
import { ControlledTextfield } from '@/components/ui/textfield/controlledTextfield.tsx'
import { Typography } from '@/components/ui/typography'
import { EditProfileValues, useEditProfile } from '@/pages/profile/editProfile/useEditProfile.ts'

type Props = {
  onSubmit: (data: EditProfileValues) => void
  initialValues?: EditProfileValues
}

export const EditProfile = ({ onSubmit, initialValues }: Props): JSX.Element => {
  const { control, handleSubmit } = useEditProfile(initialValues)

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Header isAuth={true} />
      <div className={s.editProfileWrapper}>
        <Card className={s.card}>
          <Typography variant={'large'}>Personal Information</Typography>
          <div className={s.photoContainer}>
            <div>
              <img src={Ava} alt={'avatar'} />
            </div>
          </div>
          <ControlledTextfield className={s.input} name="name" control={control} label="Nickname" />
          <Button type="submit" fullWidth>
            Save Changes
          </Button>
        </Card>
      </div>
    </form>
  )
}
