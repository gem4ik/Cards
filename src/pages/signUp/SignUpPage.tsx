import { useNavigate } from 'react-router-dom'

import { SignUpForm } from '@/components/auth/signUp/signUp.tsx'
import { useSignUpMutation } from '@/services/AuthAPI.ts'

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
