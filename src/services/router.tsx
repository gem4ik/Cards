import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { CheckEmail } from '@/components/auth/checkEmail/checkEmail.tsx'
import { ForgotPassword } from '@/components/auth/forgotPassword'
import { Layout } from '@/components/layout'
import { Login } from '@/pages/login/login.tsx'
import { Decks } from '@/pages/packsList/decks.tsx'
import { PersonalInformation } from '@/pages/profile/personal-information/personalInformation.tsx'
import { SignUpPage } from '@/pages/signUp/SignUpPage.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: '/',
            element: <Decks />,
          },
          {
            path: 'signup',
            element: <SignUpPage />,
          },
          {
            path: 'profile',
            element: <PersonalInformation onAvatarChange={() => {}} />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: 'check-email',
            element: <CheckEmail />,
          },
        ],
      },
    ],
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
  },
]
const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
