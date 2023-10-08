import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import { CheckEmail } from '@/components/auth/checkEmail/checkEmail.tsx'
import { CreateNewPassword } from '@/components/auth/CreateNewPassword/CreateNewPassword.tsx'
import { ForgotPassword } from '@/components/auth/forgotPassword'
import { NewPasswordConfirm } from '@/components/auth/newPasswordConfirm/NewPasswordConfirm.tsx'
import { Layout } from '@/components/layout'
import { Decks } from '@/pages/Decks/decks.tsx'
import { Login } from '@/pages/login/login.tsx'
import { PersonalInformation } from '@/pages/profile/personal-information/personalInformation.tsx'
import { SignUpPage } from '@/pages/signUp/SignUpPage.tsx'
import { useGetMeQuery } from '@/services/AuthAPI.ts'

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Decks />,
          },
          {
            path: 'profile',
            element: <PersonalInformation />,
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'check-email',
        element: <CheckEmail />,
      },
      {
        path: 'create-new-password',
        element: <CreateNewPassword />,
      },
      {
        path: 'new-password-confirm',
        element: <NewPasswordConfirm />,
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { error } = useGetMeQuery()

  return error ? <Navigate to="login" /> : <Outlet />
}
