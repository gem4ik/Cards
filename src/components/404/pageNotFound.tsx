import { useNavigate } from 'react-router-dom'

import notFound from '../../assets/components/404image/notFound.png'

import s from './pageNotFound.module.scss'

import { Button, Typography } from '@/components'

export const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className={s.notFound}>
      <img src={notFound} alt="page not found" />
      <Typography variant={'body1'}>Sorry! Page not found!</Typography>
      <Button onClick={() => navigate('/')}>Back to home page</Button>
    </div>
  )
}
