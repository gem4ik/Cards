import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { ChekEmail } from '@/components/auth/chekEmail/chekEmail.tsx'
import { ForgotPassword } from '@/components/auth/forgotPassword'
import { Layout } from '@/components/layout'
import { Cards } from '@/pages/namePack/cards.tsx'
import { Decks } from '@/pages/packsList/decks.tsx'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <Layout />,
  },
  {
    path: '/getDecks',
    element: <Layout />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/decks',
        element: <Decks />,
      },
    ],
  },
  {
    path: '/email',
    element: <ChekEmail />,
  },
  {
    path: '/cards',
    element: <Cards />,
  },
  {
    path: '/forgot',
    element: <ForgotPassword onSubmit={() => {}} />,
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
  const isAuthenticated = false

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
