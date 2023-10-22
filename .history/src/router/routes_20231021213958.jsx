import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import NotFoundPage from '../components/NotFoundPage'
import RequireAuth from '../components/RequireAuth'
import UnAuthorized from '../components/UnAuthorized'
import { ADMIN_PATH, DIRECTOR_PATH, EMPLOYEE_PATH, HR_PATH, PUBLIC_PATH } from '../constants/path'
import { ROLES } from '../constants/role'
import AdminLayout from '../layouts/admin'
import DirectorLayout from '../layouts/director'
import EmployeeLayout from '../layouts/employee'
import HrLayout from '../layouts/hr'
import AdminDashboard from '../pages/admin/dashboard'
import RequestListAdmin from '../pages/admin/request-list'
import Login from '../pages/auth/login/login'
import ResetPassword from '../pages/auth/resetpassword'
import BookRoom from '../pages/common/book-room'
import AdminChanagePassword from '../pages/common/change-password'
import Chat from '../pages/common/chat'
import CreateTicketRequest from '../pages/common/create-request'
import Profile from '../pages/common/profile'
import TicketDetail from '../pages/common/request-detail'
import RequestList from '../pages/common/request-list'
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
      path: PUBLIC_PATH.CREATE_REQUEST,
      element: <CreateTicketRequest />
    },
    {
      path: PUBLIC_PATH.REQUEST_DETAIL,
      element: <TicketDetail />
    },
    {
      path: PUBLIC_PATH.NOT_FOUND,
      element: <NotFoundPage />
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
              path: ADMIN_PATH.REQUEST_LIST_ADMIN,
              element: <RequestListAdmin />
            },
            {
              path: ADMIN_PATH.REQUEST_LIST_ADMIN,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <RequestListAdmin />
                </Suspense>
              )
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
              path: PUBLIC_PATH.BOOK_ROOM,
              element: <BookRoom />
            },
            {
              path: HR_PATH.MANAGE_PROFILE,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ManageProfile />
                </Suspense>
              )
            },
            {
              path: HR_PATH.REQUEST_LIST,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <RequestList />
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
