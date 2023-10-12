import { useNavigate } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import s from './profilePage.module.scss'

import { Edit } from '@/assets'
import { Logout } from '@/assets/components/personalInformation/logout.tsx'
import { Button, Typography } from '@/components'
import { useLogoutMutation } from '@/services/AuthAPI.ts'


type Props = {
  email?: string
  name?: string
  setEditProfile: () => void
}

export const Profile = ({ email, name, setEditProfile }: Props): JSX.Element => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const onLogOutHandler = () => {
    logout().then(() => navigate('/login'))
  }

  return (
    <div className={s.editProfileWrapper}>
      <div className={s.nameContainer}>
        <Typography variant={'h1'}>
          {name ? name : 'Gem4ik'} <Edit onClick={setEditProfile} />{' '}
        </Typography>
      </div>

      <Typography>
        <div className={s.emailPersonal}>{email ? email : 'busidoza4em@gmail.com'}</div>
      </Typography>
      <div className={s.logout}>
        <Button
          variant={'secondary'}
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            onLogOutHandler()
          }}
        >
          <Logout />
          Logout
        </Button>
      </div>
    </div>
  )
}
