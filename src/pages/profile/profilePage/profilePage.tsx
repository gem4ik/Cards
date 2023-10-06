import s from './profilePage.module.scss'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { Edit } from '@/pages/personalInformation/edit.tsx'
import { Logout } from '@/pages/profile/editProfile/logout.tsx'

type Props = {
  email?: string
  name?: string
  onEditProfile: () => void
}

export const Profile = ({ email, name, onEditProfile }: Props): JSX.Element => {
  return (
    <div className={s.editProfileWrapper}>
      <div className={s.nameContainer}>
        <Typography variant={'h1'}>{name ? name : 'Gem4ik'}</Typography>
        <button onClick={onEditProfile}>
          <Edit />
        </button>
      </div>

      <Typography>
        <div className={s.emailPersonal}>{email ? email : 'busidoza4emhueta@gmail.com'}</div>
      </Typography>
      <div className={s.logout}>
        <Button variant={'secondary'}>
          <Logout />
          Logout
        </Button>
      </div>
    </div>
  )
}
