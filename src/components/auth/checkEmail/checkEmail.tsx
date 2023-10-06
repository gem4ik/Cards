import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import s from './checEmail.module.scss'

import { EmailIcon } from '@/assets/components/emailIcon/emailIcon.tsx'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
import { Typography } from '@/components/ui/typography'
import { RootState } from '@/services/store.ts'

export const CheckEmail = () => {
  const email = useSelector<RootState, string>(state => state.app.forgottenEmail)

  return (
    <div className={s.checkEmailWrapper}>
      <Header isAuth={false} />
      <Card className={s.card}>
        <div className={s.typography}>
          <Typography variant={'large'}>Check Email</Typography>
        </div>
        <div className={s.emailIcon}>
          <EmailIcon />
        </div>
        <div className={s.typographyText}>
          <Typography variant={'body2'}>
            We’ve sent an Email with instructions to {email}
          </Typography>
        </div>
        <Link to={'/login'} className={s.buttonStyle}>
          <Button>Back to Sign In</Button>
        </Link>
      </Card>
    </div>
  )
}
