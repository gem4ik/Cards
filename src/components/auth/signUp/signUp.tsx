import { useForm } from 'react-hook-form'

import s from './signUp.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { Header } from '@/components/ui/header'
import { ControlledTextfield } from '@/components/ui/textfield/controlledTextfield.tsx'
import { Typography } from '@/components/ui/typography'

type FormValues = {
  email: string
  password: string
  passwordConfirmation: string
}

export const SignUp = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const submitHandler = handleSubmit(data => {
    console.log(data)
  })

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className={s.signUpWrapper}>
          <Header isAuth={false} />
          <Card className={s.card}>
            <Typography style={{ color: 'var(--color-light-100)' }} variant={'large'}>
              Sign in
            </Typography>

            <ControlledTextfield
              control={control}
              label={'Email'}
              placeholder={'Email'}
              name={'email'}
            />
            <ControlledTextfield
              control={control}
              label={'Password'}
              type={'password'}
              placeholder={'password'}
              name={'password'}
            />
            <ControlledTextfield
              name={'passwordConfirmation'}
              control={control}
              label={'Confirm Password'}
              placeholder={'password Confirmation'}
              type={'password'}
            />
            <Button type={'submit'} fullWidth={true}>
              Sign Up
            </Button>
            <Typography style={{ color: 'var(--color-light-900)' }} variant={'body2'}>
              Already have an account?
            </Typography>
            <Button variant={'link'}>Sign In</Button>
          </Card>
        </div>
      </form>
    </>
  )
}
