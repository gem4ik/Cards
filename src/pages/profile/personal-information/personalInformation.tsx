import { useState } from 'react'

import Ava from '../editProfile/ava2.png'

import s from './personalInformation.module.scss'

import { Edit } from '@/assets'
import { Card, Typography } from '@/components'
import { EditProfile, Profile } from '@/pages'

type Props = {
  email?: string
  name?: string
}

export const PersonalInformation = ({ email, name }: Props): JSX.Element => {
  const [editMode, setEditMode] = useState(false)

  const avatarChangeMutation = () => {}
  const handleAvatarChanged = () => {
    avatarChangeMutation('new Avatar')
  }

  const setEditProfile = () => {
    setEditMode(true)
  }

  const onSubmit = () => {
    setEditMode(false)
  }

  return (
    <form className={s.form}>
      <div className={s.editProfileWrapper}>
        <Card className={s.card}>
          <Typography
            className={'title'}
            style={{ color: 'var(--color-light-100)' }}
            variant={'large'}
            as="h1"
          >
            Personal Information
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
            <EditProfile onSave={onSubmit} />
          ) : (
            <Profile email={email} name={name} setEditProfile={setEditProfile} />
          )}
        </Card>
      </div>
    </form>
  )
}
