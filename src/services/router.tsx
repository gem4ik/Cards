import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import { CheckEmail } from '@/components/auth/checkEmail/checkEmail.tsx'
import { CreateNewPassword } from '@/components/auth/CreateNewPassword/CreateNewPassword.tsx'
import { ForgotPassword } from '@/components/auth/forgotPassword'
import { NewPasswordConfirm } from '@/components/auth/newPasswordConfirm/NewPasswordConfirm.tsx'
import { Layout } from '@/components/layout'
import { Login } from '@/pages/login/login.tsx'
import { Decks } from '@/pages/packsList/decks.tsx'
import { SignUpPage } from '@/pages/signUp/SignUpPage.tsx'

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
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="login" />
}
