import { useNavigate } from 'react-router-dom'

import { SignIn } from '@/components/auth/signIn/signIn.tsx'
import { useGetMeQuery } from '@/services/AuthAPI.ts'

export const Login = () => {
  const { error } = useGetMeQuery()
  const navigate = useNavigate()

  if (!error) navigate('/')

  return <SignIn onSubmit={() => {}} />
}
