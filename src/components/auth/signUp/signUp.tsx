import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './signUp.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { ControlledTextfield } from '@/components/ui/textfield/controlledTextfield.tsx'
import { Typography } from '@/components/ui/typography'

const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address').nonempty('Enter email'),
    password: z.string().nonempty('Enter password'),
    passwordConfirmation: z.string().nonempty('Confirm your password'),
  })
  .superRefine((value, ctx) => {
    if (value.password !== value.passwordConfirmation) {
      ctx.addIssue({
        message: 'Пароли не совпадают',
        code: z.ZodIssueCode.custom,
        path: ['passwordConfirmation'],
      })
    }

    return value
  })

type Schema = z.infer<typeof signUpSchema>

type Props = {
  onSubmit: (email: string, password: string) => void
}

export const SignUp = (props: Props) => {
  const { handleSubmit, control } = useForm<Schema>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  return (
    <>
      <form
        className={s.signUpWrapper}
        onSubmit={handleSubmit(data => {
          props.onSubmit(data.email, data.password)
        })}
      >
        <Card className={s.card}>
          <Typography variant={'large'}>Sign Up</Typography>

          <ControlledTextfield
            name={'email'}
            control={control}
            label={'Email'}
            placeholder={'Email'}
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
          <Button className={s.form__submit} type={'submit'} fullWidth={true}>
            Sign Up
          </Button>
          <Typography variant={'body2'}>Already have an account?</Typography>
          <Button variant={'link'}>Sign In</Button>
        </Card>
      </form>
    </>
  )
}
