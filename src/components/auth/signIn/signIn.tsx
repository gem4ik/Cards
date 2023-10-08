import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './signIn.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { ControlledCheckbox } from '@/components/ui/checkbox/controlled-checkbox.tsx'
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
      className={s.signInWrapper}
      onSubmit={handleSubmit(data => {
        props.onSubmit(data)
      })}
    >
      <Card className={s.card}>
        <Typography variant={'large'}>Sign In</Typography>
        <ControlledTextfield control={control} name={'email'} label={'email'} />
        <ControlledTextfield
          control={control}
          type="password"
          name={'password'}
          label={'password'}
        />
        <div className={s.checkboxWrapper}>
          <ControlledCheckbox
            control={control}
            name={'rememberMe'}
            label={'Remember me'}
          ></ControlledCheckbox>
        </div>
        <div className={s.form__forgotPassword}>
          <Typography as={Link} to={'/forgot-password'} variant={'body2'} className={'link'}>
            Forgot Password?
          </Typography>
        </div>
        <Button fullWidth={true}>Sign In</Button>
        <Typography variant={'body2'}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?
        </Typography>
        <Button type={'button'} variant={'link'} as={Link} to={'/signup'}>
          Sign Up
        </Button>
      </Card>
    </form>
  )
}
