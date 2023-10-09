import { ComponentPropsWithoutRef, forwardRef } from 'react'

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

  return (
    <header ref={ref} className={s.headerWrapper}>
      <img className={s.logo} src={logo} alt="logo" onClick={() => {}} />
      {isAuth && <DropdownForHeader onLogOut={props.onLogOut} user={user} />}
      {!isAuth && <Button type={'button'}> Sign In </Button>}
    </header>
  )
})
