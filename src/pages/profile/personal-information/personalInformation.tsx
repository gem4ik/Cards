import { useState } from 'react'

import Ava from '../editProfile/ava2.png'

import s from './personalInformation.module.scss'

import { Edit } from '@/assets/components/personalInformation/edit.tsx'
import { Card } from '@/components/ui/card/card.tsx'
import { Typography } from '@/components/ui/typography'
import { EditProfile } from '@/pages/profile/editProfile'
import { EditProfileValues } from '@/pages/profile/editProfile/useEditProfile.ts'
import { Profile } from '@/pages/profile/profilePage'
import { useEditProfileMutation, useGetMeQuery } from '@/services/AuthAPI.ts'

export const PersonalInformation = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false)
  const { data } = useGetMeQuery()

  const avatarChangeMutation = (avatar: string) => {
    console.log(avatar)
  }
  const handleAvatarChanged = () => {
    avatarChangeMutation('new Avatar')
  }

  const setEditProfile = () => {
    setEditMode(true)
  }
  const [changeName] = useEditProfileMutation()
  const onSubmit = (data: EditProfileValues) => {
    debugger
    changeName(data)
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
            <Profile email={data?.email} name={data?.name} setEditProfile={setEditProfile} />
          )}
        </Card>
      </div>
    </form>
  )
}
