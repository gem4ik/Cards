import { ComponentPropsWithoutRef, forwardRef } from 'react'

import s from './header.module.css'

import logo from '@/assets/components/headerIcon/Logo.svg'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

type Props = {
  isAuth: boolean
  user?: {
    photo?: string | null
    name?: string | null
    email?: string | null
  }
  onLogOut?: () => void
} & ComponentPropsWithoutRef<'header'>

export const Header = forwardRef<HTMLHeadElement, Props>((props, ref) => {
  const { isAuth, user } = props

  return (
    <header ref={ref} className={s.headerWrapper}>
      <Link to="/">
            <img className={s.logo} src={logo} alt="logo" />
      </Link>

      {isAuth && (
        <div className={s.user__header}>
          <p>{user?.name}</p>
          <img className={s.userPhoto} src={user?.photo ?? ''} alt="photo" />
        </div>
      )}
      {!isAuth && <Link to="/login" > <Button variant={'primary'}> Sign In </Button> </Link> }
    </header>
  )
})
