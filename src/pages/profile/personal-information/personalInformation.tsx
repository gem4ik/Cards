import { useState } from 'react'

import Ava from '../editProfile/ava2.png'

import s from './personalInformation.module.scss'

import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { EditProfile } from '@/pages/profile/editProfile'
import EditIcon from '@/pages/profile/editProfile/editIcon.tsx'
import { EditProfileValues, useEditProfile } from '@/pages/profile/editProfile/useEditProfile.ts'
import { Personal } from '@/pages/profile/profilePage'

type Props = {
  onSubmit: (data: EditProfileValues) => void
  initialValues?: EditProfileValues
  onAvatarChange: (newAvatar: string) => void
  email?: string
  name?: string
}

export const PersonalInformation = ({
  initialValues,
  onAvatarChange,
  email,
  name,
}: Props): JSX.Element => {
  const { handleSubmit } = useEditProfile(initialValues)
  const [editMode, setEditMode] = useState(false)

  const onEditProfile = () => {
    setEditMode(true)
  }

  const onSubmit = (data: EditProfileValues) => {
    console.log(data)
    setEditMode(false)
  }

  const handleAvatarChanged = () => {
    onAvatarChange('new Avatar')
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
                <EditIcon />
              </button>
            </div>
          </div>
          {editMode ? (
            <EditProfile onSubmit={onSubmit} />
          ) : (
            <Personal email={email} name={name} onEditProfile={onEditProfile} />
          )}
        </Card>
      </div>
    </form>
  )
}
