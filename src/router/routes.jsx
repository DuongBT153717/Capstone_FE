import { useRoutes } from 'react-router-dom'
import RequireAuth from '../components/RequireAuth'
import UnAuthorized from '../components/UnAuthorized'
import { ADMIN_PATH, DIRECTOR_PATH, HR_PATH, PUBLIC_PATH } from '../constants/path'
import { ROLES } from '../constants/role'
import AdminLayout from '../layouts/admin'
import DirectorLayout from '../layouts/director'
import HrLayout from '../layouts/hr'
import CreateStaff from '../pages/admin/create-staff'
import AdminDashboard from '../pages/admin/dashboard'
import DeviceConfig from '../pages/admin/device-config'
import Login from '../pages/auth/login/login'
import AdminChanagePassword from '../pages/common/change-password'
import Profile from '../pages/common/profile'
import DirectorDashboard from '../pages/director'
import { Suspense, lazy } from 'react'
const ManageUser = lazy(() => import('../pages/hr/manage-user')) 
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
    },
    {
      path: HR_PATH.LAYOUT,
      element: <HrLayout />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.HR} />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ManageUser />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
  ])
  return router
}
