import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from './header.module.css'

import { Logo } from '@/assets'
import { Button, DropdownForHeader } from '@/components'
import { appActions } from '@/services'

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
  const dispatch = useDispatch()

  const clearFilters = () => {
    dispatch(appActions.setRangeValue(['1', '10']))
    dispatch(appActions.setCurrentPage(1))
    dispatch(appActions.setItemsPerPage('10'))
    dispatch(appActions.setSearchName(''))
    dispatch(appActions.setAuthor('All Cards'))
  }

  const loginClickHandler = () => {
    navigate('/')
    clearFilters()
  }

  return (
    <header ref={ref} className={s.headerWrapper}>
      <Logo onClick={loginClickHandler} />
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
