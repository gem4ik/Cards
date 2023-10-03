import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Layout } from '@/components/layout'
import { PacksList } from '@/pages/packsList/packsList.tsx'
import { ChekEmail } from '@/components/auth/chekEmail/chekEmail.tsx'

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
        path: '/cards',
        element: <PacksList />,
      },
    ],
  },
  {
    path: '/email',
    element: <ChekEmail />,
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
