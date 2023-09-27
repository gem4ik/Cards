import { SignIn } from '@/components/auth/signIn/signIn.tsx'
import { SignUp } from '@/components/auth/signUp/signUp.tsx'

export function App() {
  return (
    <>
      <SignUp onSubmit={() => {}} />
      <SignIn onSubmit={() => {}} />
    </>
  )
}
