import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/header'
import s from './layout.module.scss'

export const Layout = () => {
  return (
    <div className={s.layout}>
      <Header isAuth={false} />
      <Outlet />
    </div>
  )
}
