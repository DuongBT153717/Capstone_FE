import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import NotFoundPage from '../components/NotFoundPage'
import RequireAuth from '../components/RequireAuth'
import UnAuthorized from '../components/UnAuthorized'
import {
  ADMIN_PATH,
  EMPLOYEE_PATH,
  HR_PATH,
  MANAGER_PATH,
  PUBLIC_PATH
} from '../constants/path'
import { ROLES } from '../constants/role'
import AdminLayout from '../layouts/admin'
import EmployeeLayout from '../layouts/employee'
import HrLayout from '../layouts/hr'
import RequestListAdmin from '../pages/admin/request-list'
import Login from '../pages/auth/login/login'
import ResetPassword from '../pages/auth/resetpassword'
import BookRoom from '../pages/common/book-room'
import AdminChanagePassword from '../pages/common/change-password'
import Chat from '../pages/common/chat'
import CreateTicketRequest from '../pages/common/create-request'
import Profile from '../pages/common/profile'
import TicketDetail from '../pages/common/request-detail'

import ManagerLayout from '../layouts/manager'
import ManageTicketListAdmin from '../pages/admin/manage-ticket-list'
import BookListDetail from '../pages/admin/request-list/components/BookRoomDetail'
import CreateTicketExistRequest from '../pages/common/create-request-exist'
import CheckAttendance from '../pages/employee/check-attendance'
import RequestListEmployee from '../pages/employee/request-list'
import ManageProfile from '../pages/hr/manage-profile'
import RequestListHr from '../pages/hr/request-list'
import RequestListManager from '../pages/manager/request-list'
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
      path: PUBLIC_PATH.CREATE_REQUEST_EXISTED,
      element: <CreateTicketExistRequest />
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
              path: ADMIN_PATH.REQUEST_LIST_ADMIN,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <RequestListAdmin />
                </Suspense>
              )
            },
            { 
              index: true,
              path: ADMIN_PATH.MANAGE_LIST_TICKET_ADMIN,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ManageTicketListAdmin />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '/',
      element: <RequireAuth allowedRoles={ROLES.ADMIN} />,
      children: [
        {
          path: ADMIN_PATH.BOOK_ROOM_DETAIL,
          element: (
            <Suspense fallback={<>Loading...</>}>
              <BookListDetail />
            </Suspense>
          )
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
            },
            {
              path: HR_PATH.REQUEST_LIST_HR,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <RequestListHr />
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
            },
            {
              path: EMPLOYEE_PATH.REQUEST_LIST_EMPLOYEE,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <RequestListEmployee />
                </Suspense>
              )
            },
          ]
        }
      ]
    },

    {
      path: MANAGER_PATH.LAYOUT,
      element: <ManagerLayout />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.MANAGER} />,
          children: [
            {
              path: MANAGER_PATH.REQUEST_LIST_MANAGER,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <RequestListManager />
                </Suspense>
              )
            }
          ]
        },
        {
          path: PUBLIC_PATH.BOOK_ROOM,
          element: <BookRoom />
        },
      ]
    },
    {
      path: '/',
      children: [
        {
          element: <RequireAuth allowedRoles={[ROLES.MANAGER, ROLES.EMPLOYEE, ROLES.ADMIN, ROLES.HR]} />,
          children: [
            {
              path: PUBLIC_PATH.REQUEST_DETAIL,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <TicketDetail />
                </Suspense>
              )
            }
          ]
        },
        {
          path: PUBLIC_PATH.BOOK_ROOM,
          element: <BookRoom />
        },
      ]
    },
    
  ])

  return router
}
