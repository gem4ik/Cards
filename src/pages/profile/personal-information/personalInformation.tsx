import { useState } from 'react'

import Ava from '../editProfile/ava2.png'

import s from './personalInformation.module.scss'

import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { Edit } from '@/pages/personalInformation/edit.tsx'
import { EditProfile } from '@/pages/profile/editProfile'
import { Personal } from '@/pages/profile/profilePage'

type Props = {
  email: string
  name: string
}

export const PersonalInformation = ({ email, name }: Props): JSX.Element => {
  const [editMode, setEditMode] = useState(false)

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
              <button className={s.editAvatarButton}>
                <Edit />
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
