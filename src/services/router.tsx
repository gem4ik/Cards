import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import {
  CheckEmail,
  CreateNewPassword,
  ForgotPassword,
  NewPasswordConfirm,
  Layout,
} from '@/components'
import { Decks, Login, PersonalInformation, SignUpPage } from '@/pages'
import { useGetMeQuery } from '@/services'

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
