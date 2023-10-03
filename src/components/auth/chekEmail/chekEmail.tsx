import { Card } from '@/components/ui/card/card.tsx'
import { Typography } from '@/components/ui/typography'
import { EmailIcon } from '@/assets/components/emailIcon/emailIcon.tsx'
import { Button } from '@/components/ui/button'
import s from './checEmail.module.scss'
import { Header } from '@/components/ui/header'

export const ChekEmail = () => {
  return (
    <div className={s.checkEmailWrapper}>
      <Header isAuth={false} />
      <Card className={s.card}>
        <div className={s.typography}>
          <Typography style={{ color: 'white' }} variant={'large'}>
            Check Email
          </Typography>
        </div>
        <div className={s.emailIcon}>
          <EmailIcon />
        </div>
        <div className={s.typographyText}>
          <Typography style={{ color: '#C3C1C7' }} variant={'body2'}>
            We’ve sent an Email with instructions to example@mail.com
          </Typography>
        </div>
        <div className={s.buttonStyle}>
          <Button>Back to Sign In</Button>
        </div>
      </Card>
    </div>
  )
}
