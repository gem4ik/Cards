import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './header.module.css'

import { Logo } from '@/assets'
import { Button, DropdownForHeader } from '@/components'

export type UserProps = {
  photo?: string | null
  name?: string | null
  email?: string | null
}

type Props = {
  isAuth: boolean
  user?: UserProps
  onLogOut: () => void
} & ComponentPropsWithoutRef<'header'>

export const Header = forwardRef<HTMLHeadElement, Props>((props, ref) => {
  const { isAuth, user } = props
  const navigate = useNavigate()

  return (
    <header ref={ref} className={s.headerWrapper}>
      <Logo onClick={() => navigate('/')} />
      {isAuth && <DropdownForHeader onLogOut={props.onLogOut} user={user} />}
      {!isAuth && (
        <Button onClick={() => navigate('/login')} type={'button'}>
          {' '}
          Sign In{' '}
        </Button>
      )}
    </header>
  )
})
