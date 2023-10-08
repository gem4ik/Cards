import { SignUpForm } from '@/components/auth/signUp/signUp.tsx'
import { useSignUpMutation } from '@/services/AuthAPI.ts'

export const SignUpPage = () => {
  const [SignUp] = useSignUpMutation()
  const SingUpHandler = (email: string, password: string) => {
    SignUp({ email, password })
    debugger
  }

  return <SignUpForm onSubmit={SingUpHandler} />
}
