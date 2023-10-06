import Ava from '../editProfile/ava2.png'

import s from './personalInformation.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { Edit } from '@/pages/profile/editProfile/edit.tsx'
import EditIcon from '@/pages/profile/editProfile/editIcon.tsx'
import { Logout } from '@/pages/profile/editProfile/logout.tsx'
import { EditProfileValues, useEditProfile } from '@/pages/profile/editProfile/useEditProfile.ts'

type Props = {
  onSubmit: (data: EditProfileValues) => void
  initialValues?: EditProfileValues
  onAvatarChange: (newAvatar: string) => void
  email: string
  name: string
}

export const Personal = ({
  onSubmit,
  initialValues,
  onAvatarChange,
  email,
  name,
}: Props): JSX.Element => {
  const { handleSubmit } = useEditProfile(initialValues)

  const handleAvatarChanged = () => {
    onAvatarChange('new Avatar')
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Header isAuth={true} />
      <div className={s.editProfileWrapper}>
        <Card className={s.card}>
          <Typography variant={'large'}>Personal Information</Typography>
          <div className={s.photoContainer}>
            <div>
              <img src={Ava} alt={'avatar'} />
              <button className={s.editAvatarButton} onClick={handleAvatarChanged}>
                <EditIcon />
              </button>
            </div>
          </div>
          <div className={s.nameContainer}>
            <Typography variant={'h1'}>{name ? name : 'Gem4ik'}</Typography>
            <Edit />
          </div>
          <div className={s.emailPersonal}></div>
          <Typography>{email ? email : 'busidoza4emhueta@gmail.com'}</Typography>
          <div className={s.logout}>
            <Button variant={'secondary'}>
              <Logout />
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </form>
  )
}
