import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { SignIn } from '@/components/auth/signIn/signIn.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn onSubmit={() => {}} />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
