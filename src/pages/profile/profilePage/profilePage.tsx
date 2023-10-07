import s from './profilePage.module.scss'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Edit } from '@/pages/personalInformation/edit.tsx'
import { Logout } from '@/pages/profile/editProfile/logout.tsx'

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
