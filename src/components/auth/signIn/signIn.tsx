import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './signIn.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { ControlledCheckbox } from '@/components/ui/checkbox/controlled-checkbox.tsx'
import { Header } from '@/components/ui/header'
import { ControlledTextfield } from '@/components/ui/textfield/controlledTextfield.tsx'
import { Typography } from '@/components/ui/typography'

type Data = {
  email: string
  password: string
  rememberMe: boolean
}
type Props = {
  onSubmit: (data: Data) => void
}
const signInSchema = z.object({
  email: z.string().nonempty('pystoe pole').email('ne validnii email'),
  password: z.string().nonempty('napiwi wo nibyd').min(8),
})

export const SignIn = (props: Props) => {
  const { control, handleSubmit } = useForm<Data>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(signInSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(data => {
        props.onSubmit(data)
        // console.log(data)
      })}
    >
      <div className={s.signInWrapper}>
        <Header isAuth={false} />
        <Card className={s.card}>
          <Typography style={{ color: 'var(--color-light-100)' }} variant={'large'}>
            Sign In
          </Typography>
          <ControlledTextfield control={control} name={'email'} label={'email'} />
          <ControlledTextfield control={control} name={'password'} label={'password'} />
          <div className={s.checkboxWrapper}>
            <ControlledCheckbox
              control={control}
              name={'rememberMe'}
              label={'Remember me'}
            ></ControlledCheckbox>
          </div>
          <div className={s.textWrapper}>
            <Typography style={{ color: 'var(--color-light-100)' }} variant={'body2'}>
              Forgot Password?
            </Typography>
          </div>
          <Button fullWidth={true}>Sign In</Button>
          <Typography style={{ color: 'var(--color-light-100)' }} variant={'body2'}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?
          </Typography>
          <Button variant={'link'}>Sign In</Button>
        </Card>
      </div>
    </form>
  )
}
