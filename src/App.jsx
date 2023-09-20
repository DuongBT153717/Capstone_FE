import { RouterProvider } from 'react-router-dom'
import './App.css'
import { theme } from './themes/theme'
import { ThemeProvider } from '@mui/material'
import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from './layouts/admin'

import AdminDashboard from './pages/admin/dashboard'
import GuestLayout from './layouts/guest'
import GuestDashboard from './pages/guest/dashboard'
import Login from './pages/auth/login/login'
import { ADMIN_PATH, GUEST_PATH, PUBLIC_PATH } from './constants/path'
import { ProSidebarProvider } from 'react-pro-sidebar'
import AdminProfile from './pages/admin/profile'
import AdminChanagePassword from './pages/common/change-password'

const router = createBrowserRouter([
  {
    path: PUBLIC_PATH.LOGIN,
    element: <Login />
  },
  {
    path: PUBLIC_PATH.CHANGE_PASSWORD,
    element: <AdminChanagePassword />
  },
  {
    path: ADMIN_PATH.LAYOUT,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },

      {
        path: ADMIN_PATH.PROFILE,
        element: <AdminProfile />
      }
    ]
  },
  {
    path: GUEST_PATH.LAYOUT,
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <GuestDashboard />
      }
    ]
  }
])
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <RouterProvider router={router} />
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  )
}

export default App
