import { ChangeEvent, useRef, useState } from 'react'

import Ava from '../../../assets/components/personalInformation/ava2.png'

import s from './personalInformation.module.scss'

import { Edit } from '@/assets'
import { Card, Typography } from '@/components'
import { EditProfile, Profile } from '@/pages'
import { EditProfileValues } from '@/pages/profile/editProfile/useEditProfile.ts'
import { useEditProfileMutation, useGetMeQuery } from '@/services/AuthAPI.ts'

export const PersonalInformation = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false)
  const { data } = useGetMeQuery()
  // const { avatar, setAvatar } = useState<Blob|undefined>()
  const [editProfile] = useEditProfileMutation()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const avatarChangeMutation = (event: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()

    debugger
    if (event.currentTarget.files) {
      formData.append('avatarNew', event.currentTarget.files[0])
      console.log(formData)
      // editProfile(formData)
    }
  }
  const handleAvatarChanged = () => {
    fileInputRef.current?.click()
  }
  const setEditProfile = () => {
    setEditMode(true)
  }
  const onSubmit = (data: EditProfileValues) => {
    editProfile(data)
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
              <input
                type="file"
                ref={fileInputRef}
                className={s.inputFile}
                onChange={avatarChangeMutation}
              />
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
