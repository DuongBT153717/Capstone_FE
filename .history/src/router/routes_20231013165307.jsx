import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import RequireAuth from '../components/RequireAuth'
import UnAuthorized from '../components/UnAuthorized'
import { ADMIN_PATH, DIRECTOR_PATH, EMPLOYEE_PATH, HR_PATH, PUBLIC_PATH } from '../constants/path'
import { ROLES } from '../constants/role'
import AdminLayout from '../layouts/admin'
import DirectorLayout from '../layouts/director'
import EmployeeLayout from '../layouts/employee'
import HrLayout from '../layouts/hr'
import AdminDashboard from '../pages/admin/dashboard'
import DeviceConfig from '../pages/admin/device-config'
import Login from '../pages/auth/login/login'
import ResetPassword from '../pages/auth/resetpassword'
import AdminChanagePassword from '../pages/common/change-password'
import Chat from '../pages/common/chat'
import CreateTicketRequest from '../pages/common/create-ticket'
import Profile from '../pages/common/profile'
import TicketDetail from '../pages/common/ticket-detail'
import DirectorDashboard from '../pages/director'
import CheckAttendance from '../pages/employee/check-attendance'
import ManageProfile from '../pages/hr/manage-profile'
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
      path: PUBLIC_PATH.RESET_PASSWORD,
      element: <ResetPassword />
    },
    {
      path: PUBLIC_PATH.CHAT,
      element: <Chat />
    },
    {
      path: '/unauthorized',
      element: <UnAuthorized />
    },
    {
      element: <RequireAuth allowedRoles={[ROLES.HR, ROLES.EMPLOYEE]} />,
      children: [
        {
          path: PUBLIC_PATH.CREATE_TICKET,
          element: <CreateTicketRequest />
        },
        {
          path: PUBLIC_PATH.TICKET_DETAIL,
          element: <TicketDetail />
        }
      ]
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
              path: HR_PATH.MANAGE_USER,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ManageUser />
                </Suspense>
              )
            },
            {
              path: HR_PATH.MANAGE_PROFILE,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ManageProfile />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: EMPLOYEE_PATH.LAYOUT,
      element: <EmployeeLayout />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.EMPLOYEE} />,
          children: [
            {
              path: EMPLOYEE_PATH.CHECK_ATTENDACE,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <CheckAttendance />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return router
}
