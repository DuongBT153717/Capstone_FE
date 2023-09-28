import Login from '../pages/auth/login/login'
import DirectorLayout from '../layouts/director'
import CreateStaff from '../pages/admin/create-staff'
import DeviceConfig from '../pages/admin/device-config'
import AdminChanagePassword from '../pages/common/change-password'
import Profile from '../pages/common/profile'
import DirectorDashboard from '../pages/director'
import RequireAuth from '../components/RequireAuth'
import { useRoutes } from 'react-router-dom'
import AdminLayout from '../layouts/admin'
import { ADMIN_PATH, DIRECTOR_PATH, PUBLIC_PATH } from '../constants/path'
import AdminDashboard from '../pages/admin/dashboard'
import UnAuthorized from '../components/UnAuthorized'
import { ROLES } from '../constants/role'
export default function Router() {
  let router = useRoutes([
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
      path: '/unauthorized',
      element: <UnAuthorized />
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
          element: <RequireAuth allowedRoles={ROLES.ADMIN} />,
          children: [
            {
              index: true,
              element: <AdminDashboard />
            },
            {
              path: 'device-config',
              element: <DeviceConfig />
            }
          ]
        }
      ]
    },
    {
      path: DIRECTOR_PATH.LAYOUT,
      element: <DirectorLayout />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.DIRECTOR} />,
          children: [
            {
              index: true,
              element: <DirectorDashboard />
            }
          ]
        }
      ]
    }
  ])
  return router
}
