import { useNavigate } from 'react-router-dom'

import { SignUpForm } from '@/components'
import { useSignUpMutation } from '@/services'

export const SignUpPage = () => {
  const [SignUp] = useSignUpMutation()
  const navigate = useNavigate()
  const SingUpHandler = (email: string, password: string) => {
    SignUp({ email, password })
      .then(() => navigate('/login'))
      .catch(error => console.log(error))
  }

  return <SignUpForm onSubmit={SingUpHandler} />
}
