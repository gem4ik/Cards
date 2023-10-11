import s from './profilePage.module.scss'

import { Edit } from '@/assets'
import { Button, Typography } from '@/components'
import { Logout } from '@/pages'

type Props = {
  email?: string
  name?: string
  setEditProfile: () => void
}

export const Profile = ({ email, name, setEditProfile }: Props): JSX.Element => {
  const logout = () => {}

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
        <Button variant={'secondary'} onClick={logout}>
          <Logout />
          Logout
        </Button>
      </div>
    </div>
  )
}
