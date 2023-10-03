import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
import { ControlledTextfield } from '@/components/ui/textfield/controlledTextfield.tsx'
import { Typography } from '@/components/ui/typography'
import { Link } from 'react-router-dom'

type Data = {
  email: string
}
type Props = {
  onSubmit: (data: Data) => void
}
const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const ForgotPassword = (props: Props) => {
  const { control, handleSubmit } = useForm<Data>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(data => {
        props.onSubmit(data)
        console.log(data)
      })}
    >
      <div className={s.forgotPasswordWrapper}>
        <Header isAuth={false} />
        <Card className={s.card}>
          <Typography style={{ color: 'var(--color-light-100)' }} variant={'large'}>
            Forgot your password?
          </Typography>
          <div className={s.textFieldWrapper}>
            <ControlledTextfield control={control} name={'email'} label={'email'} />
            <div className={s.textWrapper}>
              <Typography style={{ color: 'var(--color-light-900)' }} variant={'body2'}>
                Enter your email address and we will send you further instructions
              </Typography>
            </div>
          </div>
          <div className={s.buttonWrapper}>
            <Button fullWidth={true}>Send Instructions</Button>
            <div className={s.buttonTextWrapper}>
              <Typography style={{ color: 'var(--color-light-100)' }} variant={'body2'}>
                If you remember the password? <Link to="/login"><Button variant={'link'}>Log In</Button></Link>
              </Typography>
            </div>
            <div className={s.buttonLinkWrapper}>
              
            </div>
          </div>
        </Card>
      </div>
    </form>
  )
}
