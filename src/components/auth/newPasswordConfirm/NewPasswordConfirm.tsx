import { Link } from 'react-router-dom'

import s from './newPassowrdConfirm.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Typography } from '@/components/ui/typography'

export const NewPasswordConfirm = () => {
  return (
    <Card className={s.card}>
      <div>
        <Typography variant={'large'}>New password created successfully</Typography>
      </div>
      <div>
        <Typography variant={'body2'}>
          To continue, you need to log in to your account again to continue, click on the button
        </Typography>
      </div>
      <Link to={'/login'} className={s.buttonLinkWrapper}>
        <Button fullWidth>Go to login</Button>
      </Link>
    </Card>
  )
}
