import { ComponentPropsWithoutRef, forwardRef } from 'react'

import st from '../DropDown/dropDownMenu.module.scss'

import s from './header.module.css'

import logo from '@/assets/components/headerIcon/Logo.svg'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropDownItem,
  DropdownMenuRadix,
  DropDownMenuWithIcon,
} from '@/components/ui/DropDown/dropDownMenu.tsx'
import { LogOut } from '@/components/ui/DropDown/IconDropDownMenu/logOut.tsx'
import { PersonOutline } from '@/components/ui/DropDown/IconDropDownMenu/personOutline.tsx'
import { Typography } from '@/components/ui/typography'

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
      <img className={s.logo} src={logo} alt="logo" />
      {isAuth && (
        <div className={s.user__header}>
          <p>{user?.name}</p>
          {/*<img className={s.userPhoto} src={user?.photo ?? ''} alt="photo" />*/}
          <DropdownMenuRadix trigger={<Avatar />}>
            <DropDownItem>
              <div className={st.dropDownItemWrapper}>
                <Avatar />
                <div>
                  <Typography variant={'subtitle2'}>{'Ivan'}</Typography>
                  <Typography variant={'caption'}>{'j&johnson@gmail.com'}</Typography>
                </div>
              </div>
            </DropDownItem>
            <DropDownMenuWithIcon icon={<PersonOutline />} onSelect={() => {}} itemText={'Edit'} />
            <DropDownMenuWithIcon icon={<LogOut />} onSelect={() => {}} itemText={'Sign Out'} />
          </DropdownMenuRadix>
        </div>
      )}
      {!isAuth && (
        <Button type={'button'} variant={'primary'}>
          {' '}
          Sign In{' '}
        </Button>
      )}
    </header>
  )
})
