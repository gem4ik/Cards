import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './header.module.css'

import logo from '@/assets/components/headerIcon/Logo.svg'
import { Button } from '@/components/ui/button'
import { DropdownForHeader } from '@/components/ui/header/dropdownForHeader.tsx'

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
      <img className={s.logo} src={logo} alt="logo" onClick={() => {}} />
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
