import { useNavigate } from 'react-router-dom'

import { Data, SignIn } from '@/components'
import { useGetMeQuery, useSignInMutation } from '@/services'

export const Login = () => {
  const { error } = useGetMeQuery()
  const navigate = useNavigate()
  const [login] = useSignInMutation()
  const loginHandler = (data: Data) => {
    login(data).then(() => {
      navigate('/')
    })
  }

  if (!error) navigate('/')

  return <SignIn onSubmit={loginHandler} />
}
