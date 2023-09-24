import { ThemeProvider } from '@mui/material'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AdminLayout from './layouts/admin'
import { theme } from './themes/theme'

import { ProSidebarProvider } from 'react-pro-sidebar'
import { ADMIN_PATH, PUBLIC_PATH } from './constants/path'
import AdminDashboard from './pages/admin/dashboard'
import Login from './pages/auth/login/login'

import AdminChanagePassword from './pages/common/change-password'
import Profile from './pages/common/profile'
import CreateStaff from './pages/admin/create-staff'

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
    path: PUBLIC_PATH.PROFILE,
    element: <Profile />
  },
  {
    path: 'create-staff',
    element: <CreateStaff />
  },
  {
    path: ADMIN_PATH.LAYOUT,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />
      },
      
    ]
  },
  
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
