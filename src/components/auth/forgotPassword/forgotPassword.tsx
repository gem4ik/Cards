import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card.tsx'
import { ControlledTextfield } from '@/components/ui/textfield/controlledTextfield.tsx'
import { Typography } from '@/components/ui/typography'
import { appActions } from '@/services/appSlice.tsx'

type Data = {
  email: string
}
type Props = {
  onSubmit?: (data: Data) => void
}
const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const ForgotPassword = (props: Props) => {
  const dispatch = useDispatch()
  const { control, handleSubmit, getValues } = useForm<Data>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onEmailSubmit = () => {
    dispatch(appActions.setEmail(getValues('email')))
  }

  return (
    <form
      className={s.forgotPasswordWrapper}
      onSubmit={handleSubmit(data => {
        if (props.onSubmit) {
          props.onSubmit(data)
        }
      })}
    >
      <Card className={s.card}>
        <Typography variant={'large'}>Forgot your password?</Typography>
        <div className={s.textFieldWrapper}>
          <ControlledTextfield control={control} name={'email'} label={'email'} />
          <div className={s.textWrapper}>
            <Typography variant={'body2'}>
              Enter your email address and we will send you further instructions
            </Typography>
          </div>
        </div>
        <Link onClick={onEmailSubmit} to={'/check-email'} className={s.buttonWrapper}>
          <Button fullWidth={true}>Send Instructions</Button>
        </Link>
        <div className={s.buttonTextWrapper}>
          <Typography variant={'body2'}>Did you remember your password?</Typography>
        </div>
        <Link to={'/login'} className={s.buttonLinkWrapper}>
          <Button variant={'link'}>Try logging in</Button>
        </Link>
      </Card>
    </form>
  )
}
