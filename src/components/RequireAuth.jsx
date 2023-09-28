import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { Base64 } from 'js-base64';
const RequireAuth = ({ allowedRoles }) => {
  const role = Base64.atob(localStorage.getItem('ROLE'))
  const token = localStorage.getItem('TOKEN')
  return !token ? (
    <Navigate to="/login" />
  ) : role === allowedRoles ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" />
  )
}

export default RequireAuth
