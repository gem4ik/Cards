import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import {
  CheckEmail,
  CreateNewPassword,
  ForgotPassword,
  Layout,
  NewPasswordConfirm,
} from '@/components'
import { PageNotFound } from '@/components/404'
import { Cards, Decks, Login, SignUpPage } from '@/pages'
import { PersonalInformation } from '@/pages/profile/personal-information/personalInformation.tsx'
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
          {
            path: 'cards',
            element: <Cards />,
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
      {
        path: '*',
        element: <PageNotFound />,
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
