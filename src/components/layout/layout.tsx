import { Outlet, useNavigate } from 'react-router-dom'

import s from './layout.module.scss'

import { Header } from '@/components'
import { useGetMeQuery, useLogoutMutation } from '@/services'

export const Layout = () => {
  const { error } = useGetMeQuery()
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const onLogOutHandler = () => {
    logout().then(() => navigate('/login'))
  }

  return (
    <div className={s.container}>
      <Header isAuth={!error} onLogOut={onLogOutHandler} />
      <Outlet />
    </div>
  )
}
