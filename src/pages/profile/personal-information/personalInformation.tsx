import { useState } from 'react'

import Ava from '../editProfile/ava2.png'

import s from './personalInformation.module.scss'

import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { Edit } from '@/pages/personalInformation/edit.tsx'
import { EditProfile } from '@/pages/profile/editProfile'
import { Profile } from '@/pages/profile/profilePage'

type Props = {
  email?: string
  name?: string
  onAvatarChange: (newAvatar: string) => void
}

export const PersonalInformation = ({ email, name, onAvatarChange }: Props): JSX.Element => {
  const [editMode, setEditMode] = useState(false)

  const handleAvatarChanged = () => {
    onAvatarChange('new Avatar')
  }

  const onEditProfile = () => {
    setEditMode(true)
  }

  const onSubmit = () => {
    setEditMode(false)
  }

  return (
    <form className={s.form}>
      <Header isAuth={true} />
      <div className={s.editProfileWrapper}>
        <Card className={s.card}>
          <Typography style={{ color: 'var(--color-light-100)' }} variant={'large'} as="h1">
            <p className={s.title}>Personal Information</p>
          </Typography>
          <div className={s.photoContainer}>
            <div>
              <img src={Ava} alt={'avatar'} />
              <button className={s.editAvatarButton} onClick={handleAvatarChanged}>
                <Edit />
              </button>
            </div>
          </div>
          {editMode ? (
            <EditProfile onSubmit={onSubmit} />
          ) : (
            <Profile email={email} name={name} onEditProfile={onEditProfile} />
          )}
        </Card>
      </div>
    </form>
  )
}
