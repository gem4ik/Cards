import s from './signUp.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
import { Textfield } from '@/components/ui/textfield'
import { Typography } from '@/components/ui/typography'

export const SignUp = () => {
  return (
    <div className={s.signUpWrapper}>
      <Header isAuth={false} />
      <Card className={s.card}>
        <Typography style={{ color: 'var(--color-light-100)' }} variant={'large'}>
          Sign in
        </Typography>
        <Textfield label={'Email'} />
        <Textfield label={'Password'} type={'password'} />
        <Textfield label={'Confirm Password'} type={'password'} />
        <Button fullWidth={true}>Sign Up</Button>
        <Typography style={{ color: 'var(--color-light-900)' }} variant={'body2'}>
          Already have an account?
        </Typography>
        <Button variant={'link'}>Sign In</Button>
      </Card>
    </div>
  )
}
