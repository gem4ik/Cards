import s from './header.module.css'

import logo from '@/assets/components/avatarIcon/avatar3.png'
import { Button } from '@/components/ui/button'

type Props = {
  isAuth: boolean
  user?: {
    photo?: string | null
    name?: string | null
    email?: string | null
  }
  onLogOut?: () => void
}

export const Header = (props: Props) => {
  const { isAuth, user } = props

  return (
    <header className={s.headerWrapper}>
      <img className={s.logo} src={logo} alt="logo" />
      {isAuth && (
        <div className={s.user__header}>
          <p>{user?.name}</p>
          <img className={s.userPhoto} src={user?.photo ?? ''} alt="photo" />
        </div>
      )}
      {!isAuth && <Button variant={'primary'}> Sign In </Button>}
    </header>
  )
}
