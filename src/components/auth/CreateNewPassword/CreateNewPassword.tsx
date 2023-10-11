import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './CreateNewPassword.module.scss'

import { Button, Card, ControlledTextfield, Typography } from '@/components'

type Data = {
  password: string
}
type Props = {
  onSubmit?: (data: Data) => void
}
const forgotPasswordSchema = z.object({
  password: z.string().nonempty().min(6),
})

export const CreateNewPassword = (props: Props) => {
  const { control, handleSubmit } = useForm<Data>({
    mode: 'onSubmit',
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(data => {
        if (props.onSubmit) {
          props.onSubmit(data)
        }
      })}
    >
      <Card className={s.card}>
        <div className={s.newPassword__title}>
          <Typography variant={'large'}>Create new password</Typography>
        </div>
        <ControlledTextfield
          type={'password'}
          label={'Password'}
          name={'password'}
          control={control}
        ></ControlledTextfield>
        <div className={s.newPassword__description}>
          <Typography variant={'body2'}>
            Create new password and we will send you further instructions to email
          </Typography>
        </div>
        <Link to={'/new-password-confirm'} className={s.buttonLinkWrapper}>
          <Button fullWidth>Create New Password</Button>
        </Link>
      </Card>
    </form>
  )
}
